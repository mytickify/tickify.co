import prisma from '@/lib/prisma';
import { Prisma } from '@/lib/generated/prisma/client';
import { Resolvers } from '@/graphql/resolvers/types';
import { isAdminForUserId } from './utils';

export const commerceQueries: Resolvers['Query'] = {
    customers: async (_: any, { filter, pagination, orderBy }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return [];
        const isAdmin = await isAdminForUserId(user.id);
        const where: any = {};
        if (filter?.email) where.email = { contains: filter.email, mode: Prisma.QueryMode.insensitive };
        if (filter?.name) where.name = { contains: filter.name, mode: Prisma.QueryMode.insensitive };
        if (filter?.phone) where.phone = { contains: filter.phone, mode: Prisma.QueryMode.insensitive };
        if (filter?.userId) where.userId = filter.userId;
        const take = Math.min(Math.max(pagination?.limit ?? 50, 1), 100);
        const skip = Math.max(pagination?.offset ?? 0, 0);
        if (!isAdmin) {
            where.AND = [{ OR: [{ userId: user.id }, { email: user.email }] }];
        }
        const fieldMap: any = { CREATED_AT: 'createdAt', NAME: 'name', EMAIL: 'email' };
        const orderItems = Array.isArray(orderBy) ? orderBy : orderBy ? [orderBy] : [];
        const prismaOrderBy = orderItems.map((o: any) => ({ [fieldMap[o?.field] ?? 'createdAt']: o?.direction === 'ASC' ? 'asc' : 'desc' }));
        return prisma.customer.findMany({ where, orderBy: prismaOrderBy.length ? prismaOrderBy : [{ createdAt: 'desc' }], take, skip });
    },
    customersCount: async (_: any, { filter }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return 0;
        const isAdmin = await isAdminForUserId(user.id);
        const where: any = {};
        if (filter?.email) where.email = { contains: filter.email, mode: Prisma.QueryMode.insensitive };
        if (filter?.name) where.name = { contains: filter.name, mode: Prisma.QueryMode.insensitive };
        if (filter?.phone) where.phone = { contains: filter.phone, mode: Prisma.QueryMode.insensitive };
        if (filter?.userId) where.userId = filter.userId;
        if (!isAdmin) {
            where.AND = [{ OR: [{ userId: user.id }, { email: user.email }] }];
        }
        return prisma.customer.count({ where });
    },
    customer: async (_: any, { id, email }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return null;
        const isAdmin = await isAdminForUserId(user.id);
        if (isAdmin) {
            if (id) return prisma.customer.findUnique({ where: { id } });
            if (email) return prisma.customer.findUnique({ where: { email } });
            return null;
        }
        if (id) return prisma.customer.findFirst({ where: { id, OR: [{ userId: user.id }, { email: user.email }] } });
        if (email) return prisma.customer.findFirst({ where: { email, OR: [{ userId: user.id }, { email: user.email }] } });
        return null;
    },
    orders: async (_: any, { filter, pagination, orderBy }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return [];
        const isAdmin = await isAdminForUserId(user.id);
        const where: any = {};
        if (filter?.status) where.status = filter.status;
        if (filter?.eventId) where.eventId = filter.eventId;
        if (filter?.customerId) where.customerId = filter.customerId;
        if (filter?.number) where.number = { contains: filter.number, mode: Prisma.QueryMode.insensitive };
        if (filter?.currency) where.currency = filter.currency;
        if (filter?.from || filter?.to) {
            where.createdAt = {};
            if (filter?.from) where.createdAt.gte = filter.from;
            if (filter?.to) where.createdAt.lte = filter.to;
        }
        const take = Math.min(Math.max(pagination?.limit ?? 50, 1), 100);
        const skip = Math.max(pagination?.offset ?? 0, 0);
        if (!isAdmin) {
            where.AND = [{ customer: { OR: [{ userId: user.id }, { email: user.email }] } }];
        }
        const fieldMap: any = { CREATED_AT: 'createdAt', TOTAL: 'total', STATUS: 'status', NUMBER: 'number' };
        const orderItems = Array.isArray(orderBy) ? orderBy : orderBy ? [orderBy] : [];
        const prismaOrderBy = orderItems.map((o: any) => ({ [fieldMap[o?.field] ?? 'createdAt']: o?.direction === 'ASC' ? 'asc' : 'desc' }));
        return prisma.order.findMany({ where, orderBy: prismaOrderBy.length ? prismaOrderBy : [{ createdAt: 'desc' }], take, skip });
    },
    ordersCount: async (_: any, { filter }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return 0;
        const isAdmin = await isAdminForUserId(user.id);
        const where: any = {};
        if (filter?.status) where.status = filter.status;
        if (filter?.eventId) where.eventId = filter.eventId;
        if (filter?.customerId) where.customerId = filter.customerId;
        if (filter?.number) where.number = { contains: filter.number, mode: Prisma.QueryMode.insensitive };
        if (filter?.currency) where.currency = filter.currency;
        if (filter?.from || filter?.to) {
            where.createdAt = {};
            if (filter?.from) where.createdAt.gte = filter.from;
            if (filter?.to) where.createdAt.lte = filter.to;
        }
        if (!isAdmin) {
            where.AND = [{ customer: { OR: [{ userId: user.id }, { email: user.email }] } }];
        }
        return prisma.order.count({ where });
    },
    order: async (_: any, { id }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return null;
        const isAdmin = await isAdminForUserId(user.id);
        if (isAdmin) return prisma.order.findUnique({ where: { id } });
        return prisma.order.findFirst({ where: { id, customer: { OR: [{ userId: user.id }, { email: user.email }] } } });
    },
    tickets: async (_: any, { filter, pagination, orderBy }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return [];
        const isAdmin = await isAdminForUserId(user.id);
        const where: any = {};
        if (filter?.status) where.status = filter.status;
        if (filter?.eventId) where.eventId = filter.eventId;
        if (filter?.customerId) where.customerId = filter.customerId;
        if (filter?.ticketTierId) where.ticketTierId = filter.ticketTierId;
        if (filter?.code) where.code = { contains: filter.code, mode: Prisma.QueryMode.insensitive };
        const take = Math.min(Math.max(pagination?.limit ?? 50, 1), 100);
        const skip = Math.max(pagination?.offset ?? 0, 0);
        if (!isAdmin) {
            where.AND = [{ customer: { OR: [{ userId: user.id }, { email: user.email }] } }];
        }
        const fieldMap: any = { CREATED_AT: 'createdAt', CODE: 'code', STATUS: 'status' };
        const orderItems = Array.isArray(orderBy) ? orderBy : orderBy ? [orderBy] : [];
        const prismaOrderBy = orderItems.map((o: any) => ({ [fieldMap[o?.field] ?? 'createdAt']: o?.direction === 'ASC' ? 'asc' : 'desc' }));
        return prisma.ticket.findMany({ where, orderBy: prismaOrderBy.length ? prismaOrderBy : [{ createdAt: 'desc' }], take, skip });
    },
    ticketsCount: async (_: any, { filter }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return 0;
        const isAdmin = await isAdminForUserId(user.id);
        const where: any = {};
        if (filter?.status) where.status = filter.status;
        if (filter?.eventId) where.eventId = filter.eventId;
        if (filter?.customerId) where.customerId = filter.customerId;
        if (filter?.ticketTierId) where.ticketTierId = filter.ticketTierId;
        if (filter?.code) where.code = { contains: filter.code, mode: Prisma.QueryMode.insensitive };
        if (!isAdmin) {
            where.AND = [{ customer: { OR: [{ userId: user.id }, { email: user.email }] } }];
        }
        return prisma.ticket.count({ where });
    },
    ticket: async (_: any, { id, code }: any, ctx: any) => {
        const user = ctx?.user;
        if (!user) return null;
        const isAdmin = await isAdminForUserId(user.id);
        if (isAdmin) {
            if (id) return prisma.ticket.findUnique({ where: { id } });
            if (code) return prisma.ticket.findUnique({ where: { code } });
            return null;
        }
        if (id) return prisma.ticket.findFirst({ where: { id, customer: { OR: [{ userId: user.id }, { email: user.email }] } } });
        if (code) return prisma.ticket.findFirst({ where: { code, customer: { OR: [{ userId: user.id }, { email: user.email }] } } });
        return null;
    },
};
