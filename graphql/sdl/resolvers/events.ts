import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { PaymentStatus, EventCategoryType } from '../../schema/enums';
import { EventCreateArgs } from '@/lib/generated/prisma/models';

function withDefaultsForTicketTiers(tiers?: any[] | null) {
  if (!tiers) return undefined;
  return tiers.map((t) => ({
    ...t,
    soldCount: t.soldCount ?? 0,
    available: t.available ?? (typeof t.quantity === 'number' ? t.quantity > 0 : true),
    id: t.id ?? undefined,
  }));
}

export const eventsResolvers = {
  Query: {
    events: async () => {
      return prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
    },
    event: async (_: any, { id }: { id: string }) => {
      return prisma.event.findUnique({ where: { id } });
    },
    eventBySlug: async (_: any, { slug }: { slug: string }) => {
      return prisma.event.findUnique({ where: { slug } });
    },
    featuredEvents: async () => {
      return prisma.event.findMany({ where: { is_featured: true } });
    },
    eventsByCategory: async (_: any, { category }: { category: EventCategoryType }) => {
      const events = await prisma.event.findMany();
      return events.filter((event: any) => Array.isArray(event?.category?.type) && event.category.type.includes(category));
    },
    searchEvents: async (_: any, { searchTerm }: { searchTerm: string }) => {
      const events = await prisma.event.findMany();
      const term = searchTerm.toLowerCase();
      return events.filter((event: any) =>
        (event.title && event.title.toLowerCase().includes(term)) ||
        (event.description && event.description.toLowerCase().includes(term)) ||
        (event.location?.venue && event.location.venue.toLowerCase().includes(term)) ||
        (event.location?.city && event.location.city.toLowerCase().includes(term))
      );
    },
  },
  Mutation: {
    createEvent: async (_: any, { input }: { input: any }) => {
      const slug = generateSlug(input.title || 'event');
      const theme = input.theme ?? null;
      const images = input.images ?? null;
      const ticketTiers = withDefaultsForTicketTiers(input.ticketTiers) ?? undefined;
      const data: EventCreateArgs['data'] = {
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
        status: input.status ?? 'DRAFT',
        category: input.category,
        location: input.location,
        organizer: input.organizer,
        theme,
        images,
        ticketTiers,
        features: input.features ?? null,
        collaborators: input.collaborators ?? null,
      }
      
      console.log({ data });

      return prisma.event.create({ data });
    },
    updateEvent: async (_: any, { id, input }: { id: string; input: any }) => {
      const data: any = {};
      for (const key of [
        'title', 'description', 'startDate', 'startTime', 'endDate', 'endTime',
        'is_featured', 'status', 'category', 'location', 'organizer', 'features', 'collaborators'
      ]) {
        if (input[key] !== undefined) data[key] = input[key];
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
    },
    deleteEvent: async (_: any, { id }: { id: string }) => {
      const db = prisma as any;
      await db.event.delete({ where: { id } });
      return true;
    },
    createPurchase: async (_: any, { input }: { input: any }) => {
      return {
        id: Math.random().toString(36).substr(2, 9),
        eventId: input.eventId,
        ticketTierId: input.ticketTierId,
        quantity: input.quantity,
        totalAmount: 0,
        buyer: input.buyer,
        paymentStatus: PaymentStatus.PENDING,
        purchasedAt: new Date(),
      };
    },
  },
};