import prisma from '@/lib/prisma';
import { Resolvers } from '@/graphql/resolvers/types';

export const eventsTypes: Resolvers = {
    Event: {
        user: async (parent: any) => {
            if (!parent?.userId) return null;
            return prisma.user.findUnique({ where: { id: parent.userId } });
        },
    },
};
