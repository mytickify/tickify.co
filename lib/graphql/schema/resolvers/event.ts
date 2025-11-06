import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { Event, Purchase } from '../types';
import { CreateEventInput, UpdateEventInput, CreatePurchaseInput, TicketTierInput } from '../inputs';
import { EventCategoryType, PaymentStatus } from '../enums';

function withDefaultsForTicketTiers(tiers?: TicketTierInput[] | null) {
  if (!tiers) return undefined;
  return tiers.map((t) => ({
    ...t,
    soldCount: (t as any).soldCount ?? 0,
    available: (t as any).available ?? (typeof t.quantity === 'number' ? t.quantity > 0 : true),
    id: (t as any).id ?? undefined,
  })) as any;
}

@Resolver()
export class EventResolver {
  @Query(() => [Event])
  async events(): Promise<any[]> {
    const db = prisma as any;
    return db.event.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Query(() => Event, { nullable: true })
  async event(@Arg('id', () => ID) id: string): Promise<any | null> {
    const db = prisma as any;
    return db.event.findUnique({ where: { id } });
  }

  @Query(() => Event, { nullable: true })
  async eventBySlug(@Arg('slug') slug: string): Promise<any | null> {
    const db = prisma as any;
    return db.event.findUnique({ where: { slug } });
  }

  @Query(() => [Event])
  async featuredEvents(): Promise<any[]> {
    const db = prisma as any;
    return db.event.findMany({ where: { is_featured: true } });
  }

  @Query(() => [Event])
  async eventsByCategory(@Arg('category', () => EventCategoryType) category: EventCategoryType): Promise<any[]> {
    const db = prisma as any;
    const events = await db.event.findMany();
    return events.filter((event: any) => Array.isArray(event?.category?.type) && event.category.type.includes(category));
  }

  @Query(() => [Event])
  async searchEvents(@Arg('searchTerm') searchTerm: string): Promise<any[]> {
    const db = prisma as any;
    const events = await db.event.findMany();
    const term = searchTerm.toLowerCase();
    return events.filter((event: any) =>
      (event.title && event.title.toLowerCase().includes(term)) ||
      (event.description && event.description.toLowerCase().includes(term)) ||
      (event.location?.venue && event.location.venue.toLowerCase().includes(term)) ||
      (event.location?.city && event.location.city.toLowerCase().includes(term))
    );
  }

  @Mutation(() => Event)
  async createEvent(@Arg('input') input: CreateEventInput): Promise<any> {
    const slug = generateSlug(input.title || 'event');
    const theme = input.theme ?? null;
    const images = input.images ?? null;
    const ticketTiers = withDefaultsForTicketTiers(input.ticketTiers) ?? null;

    const db = prisma as any;
    return db.event.create({
      data: {
        slug,
        title: input.title,
        description: input.description,
        startDate: input.startDate,
        startTime: input.startTime,
        endDate: input.endDate,
        endTime: input.endTime,
        is_featured: Boolean(input.is_featured),
        cover_image: images?.banner ?? null,
        primary_color: theme?.primaryColor ?? null,
        secondary_color: theme?.secondaryColor ?? null,
        status: (input.status as any) ?? 'DRAFT',
        category: input.category as any,
        location: input.location as any,
        organizer: input.organizer as any,
        theme,
        images,
        ticketTiers,
        features: input.features ?? null,
        collaborators: input.collaborators ?? null,
      },
    });
  }

  @Mutation(() => Event)
  async updateEvent(@Arg('id', () => ID) id: string, @Arg('input') input: UpdateEventInput): Promise<any> {
    const data: any = {};
    for (const key of [
      'title', 'description', 'startDate', 'startTime', 'endDate', 'endTime',
      'is_featured', 'status', 'category', 'location', 'organizer', 'features', 'collaborators'
    ]) {
      if ((input as any)[key] !== undefined) data[key] = (input as any)[key];
    }

    if (input.theme !== undefined) {
      data.theme = input.theme;
      data.primary_color = input.theme?.primaryColor ?? null;
      data.secondary_color = input.theme?.secondaryColor ?? null;
    }

    if (input.images !== undefined) {
      data.images = input.images;
      data.cover_image = input.images?.banner ?? null;
    }

    if (input.ticketTiers !== undefined) {
      data.ticketTiers = withDefaultsForTicketTiers(input.ticketTiers || null);
    }

    const db = prisma as any;
    return db.event.update({ where: { id }, data });
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Arg('id', () => ID) id: string): Promise<boolean> {
    const db = prisma as any;
    await db.event.delete({ where: { id } });
    return true;
  }

  @Mutation(() => Purchase)
  async createPurchase(@Arg('input') input: CreatePurchaseInput): Promise<Purchase> {
    return {
      id: Math.random().toString(36).substr(2, 9),
      eventId: input.eventId,
      ticketTierId: input.ticketTierId,
      quantity: input.quantity,
      totalAmount: 0,
      buyer: input.buyer as any,
      paymentStatus: PaymentStatus.PENDING,
      purchasedAt: new Date(),
    } as Purchase;
  }
}