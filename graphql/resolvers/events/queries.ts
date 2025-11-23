import prisma from '@/lib/prisma';
import { Prisma } from '@/lib/generated/prisma/client';
import { Resolvers } from '@/graphql/resolvers/types';
import { FieldNode, Kind } from 'graphql';

export const eventsQueries: Resolvers['Query'] = {
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
};
