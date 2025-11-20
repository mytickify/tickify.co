import prisma from '@/lib/prisma';

export const userResolvers = {
  Query: {
    users: async () => {
      const db = prisma as any;
      return db.user.findMany({ orderBy: { createdAt: 'desc' } });
    },
  },
};