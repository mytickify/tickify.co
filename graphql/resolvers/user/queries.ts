import prisma from '@/lib/prisma';
import { Resolvers } from '@/graphql/resolvers/types';
import { isAdminForUserId, createUserWhereInput } from './utils';

export const userQueries: Resolvers['Query'] = {
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
        console.log({ prismaOrderBy, filter });
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
};
