import prisma from '@/lib/prisma';
import { Prisma } from '@/lib/generated/prisma/client';
import { Resolvers } from '@/graphql/resolvers/types';
import { InputMaybe, UsersFilterInput, UserInput } from '../types';
import { auth } from '@/lib/auth';

function isAdminForUserId(userId: string | undefined | null) {
  if (!userId) return Promise.resolve(false);
  return prisma.userRole
    .findMany({ where: { userId }, include: { role: true } })
    .then((urs) => urs.some((ur: any) => ['ADMIN', 'ADMIN_WEB', 'ADMINISTRATOR', 'ADMIN_WEB_APP', 'ADMIN_WEB'].includes(String(ur.role?.name).toUpperCase())));
}
const createUserWhereInput = (filter?: InputMaybe<UsersFilterInput>) => {
  const where: Prisma.UserWhereInput = {};
  if (filter?.name) where.name = { contains: filter.name, mode: Prisma.QueryMode.insensitive };
  if (filter?.email) where.email = { contains: filter.email, mode: Prisma.QueryMode.insensitive };
  if (filter?.searchTerm) {
    where.OR = [
      { name: { contains: filter.searchTerm, mode: Prisma.QueryMode.insensitive } },
      { email: { contains: filter.searchTerm, mode: Prisma.QueryMode.insensitive } },
    ];
  }
  return where;
};

export const userResolvers: Resolvers = {
  Query: {
    user: async (_, { id }, ctx) => {
      const actor = ctx?.user;
      if (!actor) return null;
      const isAdmin = await isAdminForUserId(actor.id);
      if (isAdmin || actor.id === id) {
        return prisma.user.findUnique({ where: { id } });
      }
      return null;
    },
    users: async (_, { filter, pagination, orderBy }, ctx) => {
      const user = ctx?.user;
      if (!user) return [];
      const isAdmin = await isAdminForUserId(user.id);
      if (!isAdmin) return [];
      const where = createUserWhereInput(filter);
      const take = Math.min(Math.max(pagination?.limit ?? 50, 1), 100);
      const skip = Math.max(pagination?.offset ?? 0, 0);
      const fieldMap: any = { CREATED_AT: 'createdAt', NAME: 'name', EMAIL: 'email' };
      const orderItems = Array.isArray(orderBy) ? orderBy : orderBy ? [orderBy] : [];
      const prismaOrderBy = orderItems.map((o: any) => ({ [fieldMap[o?.field] ?? 'createdAt']: o?.direction === 'ASC' ? 'asc' : 'desc' }));
      console.log({prismaOrderBy, filter});
      return prisma.user.findMany({ where, orderBy: prismaOrderBy.length ? prismaOrderBy : [{ createdAt: 'desc' }], take, skip });
    },
    usersCount: async (_, { filter }, ctx) => {
      const user = ctx?.user;
      if (!user) return 0;
      const isAdmin = await isAdminForUserId(user.id);
      if (!isAdmin) return 0;
      const where = createUserWhereInput(filter);
      return prisma.user.count({ where });
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }, ctx: any) => {
      const actor = ctx?.user;
      if (!actor) throw new Error('Unauthorized');
      const isAdmin = await isAdminForUserId(actor.id);
      if (!isAdmin) throw new Error('Unauthorized');
      const email = String(input?.email || '').trim().toLowerCase();
      if (!email) throw new Error('Email is required');
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) throw new Error('USER_EXISTS');
      if (input?.password) {
        await auth.api.signUpEmail({ body: { email, password: String(input.password), name: input?.name || email, rememberMe: false } });
      } else {
        await prisma.user.create({ data: { email, name: input?.name ?? null, image: input?.image ?? null, emailVerified: false } });
      }
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error('Failed to create user');
      return user as any;
    },
    updateUser: async (_: any, { id, input }: { id: string; input: UserInput }, ctx: any) => {
      const actor = ctx?.user;
      if (!actor) throw new Error('Unauthorized');
      const isAdmin = await isAdminForUserId(actor.id);
      if (!isAdmin && actor.id !== id) throw new Error('Unauthorized');
      const data: any = {};
      if (input?.name !== undefined) data.name = input.name;
      if (input?.password) {
        throw new Error('PASSWORD_CHANGE_NOT_SUPPORTED');
      }
      if (input?.email !== undefined) data.email = String(input.email || '').trim().toLowerCase();
      if (input?.image !== undefined) data.image = input.image ?? null;
      const updated = await prisma.user.update({ where: { id }, data });
      return updated as any;
    },
  },
};
