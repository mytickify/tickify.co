import prisma from '@/lib/prisma';
import { Resolvers } from '@/graphql/resolvers/types';

export const commerceTypes: Resolvers = {
    Customer: {
        user: async (parent: any) => {
            if (!parent?.userId) return null;
            return prisma.user.findUnique({ where: { id: parent.userId } });
        },
        orders: async (parent: any) => {
            return prisma.order.findMany({ where: { customerId: parent.id } });
        },
        tickets: async (parent: any) => {
            return prisma.ticket.findMany({ where: { customerId: parent.id } });
        },
    },
    Order: {
        customer: async (parent: any) => {
            return prisma.customer.findUniqueOrThrow({ where: { id: parent.customerId } });
        },
        event: async (parent: any) => {
            return prisma.event.findUniqueOrThrow({ where: { id: parent.eventId } });
        },
        tickets: async (parent: any) => {
            return prisma.ticket.findMany({ where: { orderId: parent.id } });
        },
    },
    Ticket: {
        customer: async (parent: any) => {
            return prisma.customer.findUniqueOrThrow({ where: { id: parent.customerId } });
        },
        event: async (parent: any) => {
            return prisma.event.findUniqueOrThrow({ where: { id: parent.eventId } });
        },
        ticketTier: async (parent: any) => {
            return prisma.ticketTier.findUniqueOrThrow({ where: { id: parent.ticketTierId } });
        },
        order: async (parent: any) => {
            if (!parent?.orderId) return null;
            return prisma.order.findUnique({ where: { id: parent.orderId } });
        },
    },
};
