import { Resolvers } from '@/graphql/resolvers/types';
import prisma from '@/lib/prisma';

export const pageQueries: Resolvers['Query'] = {
    pages: async () => {
        return prisma.page.findMany({ include: { sections: true }, orderBy: { createdAt: 'desc' } });
    },
    page: async (_, { id }) => {
        return prisma.page.findUnique({ where: { id }, include: { sections: true } });
    },
    pageBySlug: async (_, { slug }) => {
        return prisma.page.findUnique({ where: { slug }, include: { sections: true } });
    },
    pagesByEvent: async (_, { eventId }) => {
        return prisma.page.findMany({ where: { id: eventId }, include: { sections: true } });
    },
};
