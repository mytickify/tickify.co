import prisma from '@/lib/prisma';
import { Prisma } from '@/lib/generated/prisma/client';
import { Resolvers } from '@/graphql/resolvers/types';
import { InputMaybe, UsersFilterInput } from '../types';

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
};