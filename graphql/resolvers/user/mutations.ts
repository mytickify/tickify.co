import prisma from '@/lib/prisma';
import { Resolvers } from '@/graphql/resolvers/types';
import { UserInput } from '../../types';
import { auth } from '@/lib/auth';
import { isAdminForUserId } from './utils';

export const userMutations: Resolvers['Mutation'] = {
    createUser: async (_: any, { input }: { input: UserInput }, ctx: any) => {
        const actor = ctx?.user;
        if (!actor) throw new Error('Unauthorized');
        const isAdmin = await isAdminForUserId(actor.id);
        if (!isAdmin) throw new Error('Unauthorized');
        const email = String(input?.email || '').trim().toLowerCase();
        if (!email) throw new Error('Email is required');
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) throw new Error('USER_EXISTS');
        if (input?.password) {
            await auth.api.signUpEmail({ body: { email, password: String(input.password), name: input?.name || email, rememberMe: false } });
        } else {
            await prisma.user.create({ data: { email, name: input?.name ?? null, image: input?.image ?? null, emailVerified: false } });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('Failed to create user');
        return user as any;
    },
    updateUser: async (_: any, { id, input }: { id: string; input: UserInput }, ctx: any) => {
        const actor = ctx?.user;
        if (!actor) throw new Error('Unauthorized');
        const isAdmin = await isAdminForUserId(actor.id);
        if (!isAdmin && actor.id !== id) throw new Error('Unauthorized');
        const data: any = {};
        if (input?.name !== undefined) data.name = input.name;
        if (input?.password) {
            throw new Error('PASSWORD_CHANGE_NOT_SUPPORTED');
        }
        if (input?.email !== undefined) data.email = String(input.email || '').trim().toLowerCase();
        if (input?.image !== undefined) data.image = input.image ?? null;
        const updated = await prisma.user.update({ where: { id }, data });
        return updated as any;
    },
    deleteUser: async (_: any, { id }: { id: string }, ctx: any) => {
        const actor = ctx?.user;
        if (!actor) throw new Error('Unauthorized');
        const isAdmin = await isAdminForUserId(actor.id);
        if (!isAdmin) throw new Error('Unauthorized');
        await prisma.user.delete({ where: { id } });
        return true;
    },
};
