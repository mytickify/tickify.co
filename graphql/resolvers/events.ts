import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { Prisma } from '@/lib/generated/prisma/client';
import { EventStatus } from '@/lib/generated/prisma/enums';
import { Resolvers } from '@/graphql/resolvers/types';
import { PaymentStatus } from '@/graphql/types';
import { FieldNode, Kind } from 'graphql';
import { randomBytes } from 'crypto';

function withDefaultsForTicketTiers(tiers?: any[] | null) {
  if (!tiers) return undefined;
  return tiers.map((t) => ({
    ...t,
    soldCount: t.soldCount ?? 0,
    available: t.available ?? (typeof t.quantity === 'number' ? t.quantity > 0 : true),
    id: t.id ?? undefined,
  }));
}

export const eventsResolvers: Resolvers = {
  Query: {
    events: async (_: any, { filter, pagination, orderBy }: any, _context, info) => {
      const selections = info.fieldNodes[0]
      .selectionSet?.selections
      .filter((s): s is FieldNode => s.kind === Kind.FIELD && s.selectionSet !== undefined)
      .map(s => s.name.value) || [];
      
      console.log(selections);
      console.log(info.fragments);
      const where: any = {};
      if (filter?.status) where.status = filter.status;
      if (filter?.is_featured !== undefined) where.is_featured = filter.is_featured;
      if (filter?.userId) where.userId = filter.userId;
      if (filter?.category) where.categories = { some: { type: filter.category } };
      const locationWhere: any = {};
      if (filter?.city) locationWhere.city = { equals: filter.city, mode: Prisma.QueryMode.insensitive };
      if (filter?.venue) locationWhere.venue = { contains: filter.venue, mode: Prisma.QueryMode.insensitive };
      if (Object.keys(locationWhere).length) where.location = { is: locationWhere };
      if (filter?.fromDate) where.startDate = { gte: filter.fromDate };
      if (filter?.toDate) where.endDate = { lte: filter.toDate };
      const s = filter?.searchTerm ? { contains: filter.searchTerm, mode: Prisma.QueryMode.insensitive } : null;
      if (s) {
        where.OR = [
          { title: s },
          { description: s },
          { location: { is: { venue: s } } },
          { location: { is: { city: s } } },
        ];
      }
      const take = Math.min(Math.max(pagination?.limit ?? 50, 1), 100);
      const skip = Math.max(pagination?.offset ?? 0, 0);
      const fieldMap: any = {
        CREATED_AT: 'createdAt',
        UPDATED_AT: 'updatedAt',
        START_DATE: 'startDate',
        END_DATE: 'endDate',
        TITLE: 'title',
        STATUS: 'status',
        FEATURED: 'is_featured',
      };
      const orderItems = Array.isArray(orderBy) ? orderBy : orderBy ? [orderBy] : [];
      const prismaOrderBy = orderItems.map((o: any) => ({ [fieldMap[o?.field] ?? 'createdAt']: o?.direction === 'ASC' ? 'asc' : 'desc' }));
      return prisma.event.findMany({
        where,
        orderBy: prismaOrderBy.length ? prismaOrderBy : [{ createdAt: 'desc' }],
        take,
        skip,
        include: {
          location: selections.includes('location'),
          organizer: selections.includes('organizer'),
          theme: selections.includes('theme'),
          images: selections.includes('images'),
          features: selections.includes('features'),
          ticketTiers: selections.includes('ticketTiers'),
          collaborators: selections.includes('collaborators'),
          categories: selections.includes('categories'),
        }
      })
    },
    eventsCount: async (_: any, { filter }: any) => {
      const where: any = {};
      if (filter?.status) where.status = filter.status;
      if (filter?.is_featured !== undefined) where.is_featured = filter.is_featured;
      if (filter?.userId) where.userId = filter.userId;
      if (filter?.category) where.categories = { some: { type: filter.category } };
      const locationWhere: any = {};
      if (filter?.city) locationWhere.city = { equals: filter.city, mode: Prisma.QueryMode.insensitive };
      if (filter?.venue) locationWhere.venue = { contains: filter.venue, mode: Prisma.QueryMode.insensitive };
      if (Object.keys(locationWhere).length) where.location = { is: locationWhere };
      if (filter?.fromDate) where.startDate = { gte: filter.fromDate };
      if (filter?.toDate) where.endDate = { lte: filter.toDate };
      const s = filter?.searchTerm ? { contains: filter.searchTerm, mode: Prisma.QueryMode.insensitive } : null;
      if (s) {
        where.OR = [
          { title: s },
          { description: s },
          { location: { is: { venue: s } } },
          { location: { is: { city: s } } },
        ];
      }
      return prisma.event.count({ where });
    },
    event: async (_: any, { id }: { id: string }) => {
      return prisma.event.findUnique({ where: { id }, include: { location: true, organizer: true, theme: true, images: true, features: true, ticketTiers: true, collaborators: true, categories: true } });
    },
    eventBySlug: async (_: any, { slug }: { slug: string }) => {
      return prisma.event.findUnique({ where: { slug }, include: { location: true, organizer: true, theme: true, images: true, features: true, ticketTiers: true, collaborators: true, categories: true } });
    },
    featuredEvents: async () => {
      return prisma.event.findMany({ where: { is_featured: true }, include: { location: true, organizer: true, theme: true, images: true, features: true, ticketTiers: true, collaborators: true, categories: true } });
    },
    eventsByCategory: async (_: any, { categoryId }: { categoryId: string }) => {
      return prisma.event.findMany({ where: { categories: { some: { id: categoryId } } }, include: { location: true, organizer: true, theme: true, images: true, features: true, ticketTiers: true, collaborators: true, categories: true } });
    },
    searchEvents: async (_: any, { searchTerm }: { searchTerm: string }) => {
      const s = { contains: searchTerm, mode: Prisma.QueryMode.insensitive };
      return prisma.event.findMany({
        where: {
          OR: [
            { title: s },
            { description: s },
            { location: { is: { venue: s } } },
            { location: { is: { city: s } } },
          ],
        },
        include: { location: true, organizer: true, theme: true, images: true, features: true, ticketTiers: true, collaborators: true, categories: true },
      });
    },
  },
  Mutation: {
    createEvent: async (_: any, { input }: { input: any }) => {
      console.log({ input }, 'createEvent');
      const slug = generateSlug(input.title || 'event');
      const theme = input.theme ?? null;
      const images = input.images ?? null;
      const ticketTiers = withDefaultsForTicketTiers(input.ticketTiers) ?? undefined;
      const data: any = {
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
        status: input.status ?? EventStatus.DRAFT,
        categories: input.categoryIds?.length ? {
          connect: (input.categoryIds as any[]).map((id: any) => ({ id })),
        } : (input.categoryTypes?.length ? {
          connectOrCreate: (input.categoryTypes as any[]).map((type: any) => ({
            where: { type },
            create: { type, description: '' },
          })),
        } : undefined),
        location: input.location ? {
          create: {
            venue: input.location.venue,
            address: input.location.address,
            city: input.location.city,
            lat: (input.location as any).lat ?? null,
            lng: (input.location as any).lng ?? null,
          }
        } : undefined,
        organizer: input.organizer ? { create: input.organizer } : undefined,
        theme: theme ? {
          create: {
            primaryColor: theme.primaryColor,
            secondaryColor: theme.secondaryColor,
            accentColor: theme.accentColor,
            textColor: theme.textColor,
            fontFamily: String(theme.fontFamily),
            layout: String(theme.layout),
            gradientEnabled: theme.gradientEnabled,
            gradientDirection: String(theme.gradientDirection),
            backgroundColor: (theme as any).backgroundColor ?? '#FFFFFF',
          }
        } : undefined,
        images: images ? {
          create: {
            banner: images.banner ?? null,
            gallery: images.gallery ?? [],
          }
        } : undefined,
        features: input.features ? { create: input.features } : undefined,
        ticketTiers: ticketTiers ? { create: ticketTiers } : undefined,
        collaborators: input.collaborators ? { create: input.collaborators } : undefined,
        userId: input.userId,
      }

      console.log({ data });

      return prisma.event.create({ data });
    },
    updateEvent: async (_: any, { id, input }: { id: string; input: any }) => {
      const data: any = {};
      for (const key of [
        'title', 'description', 'startDate', 'startTime', 'endDate', 'endTime',
        'is_featured', 'status'
      ]) {
        if (input[key] !== undefined) data[key] = input[key];
      }

      if (!!input.images) {
        data.cover_image = input.images?.banner ?? null;
        data.images = input.images ? { upsert: { create: { banner: input.images.banner ?? null, gallery: input.images.gallery ?? [] }, update: { banner: input.images.banner ?? null, gallery: input.images.gallery ?? [] } } } : { delete: true };
      }

      if (!!input.ticketTiers) {
        const tiers = withDefaultsForTicketTiers(input.ticketTiers || null);
        data.ticketTiers = tiers ? { deleteMany: {}, create: tiers } : { deleteMany: {} };
      }

      if (!!input.userId) {
        data.userId = input.userId;
      }
      console.log({ data }, 'updateEvent');
      if (!!input.categoryIds) {
        const ids = input.categoryIds ?? [];
        data.categories = { set: ids.map((cid: any) => ({ id: cid })) };
      }

      if (!!input.location) {
        data.location = input.location ? {
          upsert: {
            create: {
              venue: input.location.venue,
              address: input.location.address,
              city: input.location.city,
              lat: (input.location as any).lat ?? null,
              lng: (input.location as any).lng ?? null,
            }, update: {
              venue: input.location.venue,
              address: input.location.address,
              city: input.location.city,
              lat: (input.location as any).lat ?? null,
              lng: (input.location as any).lng ?? null,
            }
          }
        } : { delete: true };
      }

      if (!!input.organizer) {
        data.organizer = input.organizer ? { upsert: { create: input.organizer, update: input.organizer } } : { delete: true };
      }

      if (!!input.theme) {
        const t = input.theme;
        data.primary_color = t?.primaryColor ?? null;
        data.secondary_color = t?.secondaryColor ?? null;
        data.theme = t ? {
          upsert: {
            create: {
              primaryColor: t.primaryColor,
              secondaryColor: t.secondaryColor,
              accentColor: t.accentColor,
              textColor: t.textColor,
              fontFamily: String(t.fontFamily),
              layout: String(t.layout),
              gradientEnabled: t.gradientEnabled,
              gradientDirection: String(t.gradientDirection),
              backgroundColor: (t as any).backgroundColor ?? '#FFFFFF',
            }, update: {
              primaryColor: t.primaryColor,
              secondaryColor: t.secondaryColor,
              accentColor: t.accentColor,
              textColor: t.textColor,
              fontFamily: String(t.fontFamily),
              layout: String(t.layout),
              gradientEnabled: t.gradientEnabled,
              gradientDirection: String(t.gradientDirection),
              backgroundColor: (t as any).backgroundColor ?? '#FFFFFF',
            }
          }
        } : { delete: true };
      }

      if (!!input.features) {
        const f = input.features;
        data.features = f ? { upsert: { create: f, update: f } } : { delete: true };
      }
      console.log({ data });
      return prisma.event.update({ where: { id }, data });
    },
    deleteEvent: async (_: any, { id }: { id: string }) => {
      const db = prisma as any;
      await db.event.delete({ where: { id } });
      return true;
    },
    createPurchase: async (_: any, { input }: { input: any }, ctx: any) => {
      const { eventId, ticketTierId, quantity, buyer } = input;
      if (!eventId || !ticketTierId) throw new Error('Missing eventId or ticketTierId');
      if (typeof quantity !== 'number' || quantity <= 0) throw new Error('Quantity must be greater than zero');

      const event = await prisma.event.findUnique({ where: { id: eventId }, select: { id: true } });
      if (!event) throw new Error('Event not found');

      const tier = await prisma.ticketTier.findUnique({ where: { id: ticketTierId } });
      if (!tier) throw new Error('Ticket tier not found');
      if (tier.eventId !== eventId) throw new Error('Ticket tier does not belong to event');

      const availableCount = tier.quantity - tier.soldCount;
      if (quantity > availableCount) throw new Error('Not enough tickets available');

      const totalAmount = tier.price * quantity;
      const currency = tier.currency;
      const orderNumber = `ORD-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;

      const genCode = () => `TKT-${randomBytes(4).toString('hex').toUpperCase()}`;

      const result = await prisma.$transaction(async (tx) => {
        const customer = await tx.customer.upsert({
          where: { email: buyer.email },
          update: { name: buyer.name, phone: buyer.phone, userId: ctx?.user?.email === buyer.email ? ctx?.user?.id : undefined },
          create: { email: buyer.email, name: buyer.name, phone: buyer.phone, userId: ctx?.user?.email === buyer.email ? ctx?.user?.id : undefined },
        });

        const order = await tx.order.create({
          data: {
            number: orderNumber,
            status: 'PENDING',
            total: totalAmount,
            currency,
            customerId: customer.id,
            eventId,
          }
        });

        await tx.ticket.createMany({
          data: Array.from({ length: quantity }, () => ({
            code: genCode(),
            status: 'ISSUED',
            customerId: customer.id,
            eventId,
            ticketTierId,
            orderId: order.id,
          }))
        });

        const newSold = tier.soldCount + quantity;
        await tx.ticketTier.update({
          where: { id: ticketTierId },
          data: {
            soldCount: newSold,
            available: tier.quantity - newSold > 0,
          }
        });

        return { order, customer };
      });

      return {
        id: result.order.id,
        eventId,
        ticketTierId,
        quantity,
        totalAmount,
        buyer,
        paymentStatus: PaymentStatus.Pending,
        purchasedAt: new Date(),
      };
    },
  },
  Event: {
    user: async (parent: any) => {
      if (!parent?.userId) return null;
      return prisma.user.findUnique({ where: { id: parent.userId } });
    },
  },
  // Location: {
  //   coordinates: (parent: any) => {
  //     if (parent?.lat == null && parent?.lng == null) return null;
  //     return { lat: parent.lat ?? 0, lng: parent.lng ?? 0 };
  //   },
  // },
};