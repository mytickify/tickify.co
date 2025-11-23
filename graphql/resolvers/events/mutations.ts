import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { EventStatus } from '@/lib/generated/prisma/enums';
import { Resolvers } from '@/graphql/resolvers/types';
import { PaymentStatus } from '@/graphql/types';
import { randomBytes } from 'crypto';
import { withDefaultsForTicketTiers } from './utils';

export const eventsMutations: Resolvers['Mutation'] = {
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
        const orderNumber = `ORD-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

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
};
