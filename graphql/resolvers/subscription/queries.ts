import prisma from '@/lib/prisma';

export const subscriptionQueries = {
    subscriptions: async () => {
        const db = prisma as any;
        return db.mailSubscription.findMany({ orderBy: { createdAt: 'desc' } });
    },
    subscriptionByEmail: async (_: any, { email }: { email: string }) => {
        const db = prisma as any;
        return db.mailSubscription.findUnique({ where: { email } });
    },
};
