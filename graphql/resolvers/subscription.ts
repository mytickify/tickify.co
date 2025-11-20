import prisma from '@/lib/prisma';
import { generateId } from '@/lib/utils';
import { SubscriptionStatus } from '../types';

export const subscriptionResolvers = {
  Query: {
    subscriptions: async () => {
      const db = prisma as any;
      return db.mailSubscription.findMany({ orderBy: { createdAt: 'desc' } });
    },
    subscriptionByEmail: async (_: any, { email }: { email: string }) => {
      const db = prisma as any;
      return db.mailSubscription.findUnique({ where: { email } });
    },
  },
  Mutation: {
    subscribe: async (_: any, { input }: { input: any }) => {
      const db = prisma as any;
      const token = generateId();
      return db.mailSubscription.upsert({
        where: { email: input.email },
        update: {
          name: input.name ?? undefined,
          preferences: input.preferences ?? undefined,
          source: input.source ?? undefined,
          status: SubscriptionStatus.Pending, 
          token,
          unsubscribedAt: null,
        },
        create: {
          email: input.email,
          name: input.name ?? null,
          preferences: input.preferences ?? null,
          source: input.source ?? null,
          status: SubscriptionStatus.Pending, 
          token,
          subscribedAt: new Date(),
        },
      });
    },
    confirmSubscription: async (_: any, { input }: { input: any }) => {
      const db = prisma as any;
      const existing = await db.mailSubscription.findFirst({ where: { token: input.token } });
      if (!existing) return null;
      return db.mailSubscription.update({
        where: { email: existing.email },
        data: { status: SubscriptionStatus.Confirmed, verifiedAt: new Date(), token: null },
      });
    },
    unsubscribe: async (_: any, { input }: { input: any }) => {
      const db = prisma as any;
      return db.mailSubscription.update({
        where: { email: input.email },
        data: { status: SubscriptionStatus.Unsubscribed, unsubscribedAt: new Date() },
      });
    },
  },
};