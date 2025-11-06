import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import prisma from '@/lib/prisma';
import { MailSubscription } from '../types';
import { SubscribeInput, ConfirmSubscriptionInput, UnsubscribeInput } from '../inputs';
import { SubscriptionStatus } from '../enums';
import { generateId } from '@/lib/utils';

@Resolver()
export class SubscriptionResolver {
  @Query(() => [MailSubscription])
  async subscriptions(): Promise<any[]> {
    const db = prisma as any;
    return db.mailSubscription.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Query(() => MailSubscription, { nullable: true })
  async subscriptionByEmail(@Arg('email') email: string): Promise<any | null> {
    const db = prisma as any;
    return db.mailSubscription.findUnique({ where: { email } });
  }

  @Mutation(() => MailSubscription)
  async subscribe(@Arg('input') input: SubscribeInput): Promise<any> {
    const db = prisma as any;
    const token = generateId();
    return db.mailSubscription.upsert({
      where: { email: input.email },
      update: {
        name: input.name ?? undefined,
        preferences: input.preferences ?? undefined,
        source: input.source ?? undefined,
        status: SubscriptionStatus.PENDING,
        token,
        unsubscribedAt: null,
      },
      create: {
        email: input.email,
        name: input.name ?? null,
        preferences: input.preferences ?? null,
        source: input.source ?? null,
        status: SubscriptionStatus.PENDING,
        token,
        subscribedAt: new Date(),
      },
    });
  }

  @Mutation(() => MailSubscription)
  async confirmSubscription(@Arg('input') input: ConfirmSubscriptionInput): Promise<any> {
    const db = prisma as any;
    const existing = await db.mailSubscription.findFirst({ where: { token: input.token } });
    if (!existing) {
      // No-op; return null to indicate not found
      return null;
    }
    return db.mailSubscription.update({
      where: { email: existing.email },
      data: {
        status: SubscriptionStatus.CONFIRMED,
        verifiedAt: new Date(),
        token: null,
      },
    });
  }

  @Mutation(() => MailSubscription)
  async unsubscribe(@Arg('input') input: UnsubscribeInput): Promise<any> {
    const db = prisma as any;
    return db.mailSubscription.update({
      where: { email: input.email },
      data: {
        status: SubscriptionStatus.UNSUBSCRIBED,
        unsubscribedAt: new Date(),
      },
    });
  }
}