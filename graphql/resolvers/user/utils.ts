import prisma from '@/lib/prisma';
import { Prisma } from '@/lib/generated/prisma/client';
import { InputMaybe, UsersFilterInput } from '../../types';

export function isAdminForUserId(userId: string | undefined | null) {
    if (!userId) return Promise.resolve(false);
    return prisma.userRole
        .findMany({ where: { userId }, include: { role: true } })
        .then((urs) => urs.some((ur: any) => ['ADMIN', 'ADMIN_WEB', 'ADMINISTRATOR', 'ADMIN_WEB_APP', 'ADMIN_WEB'].includes(String(ur.role?.name).toUpperCase())));
}

export const createUserWhereInput = (filter?: InputMaybe<UsersFilterInput>) => {
    const where: Prisma.UserWhereInput = {};
    if (filter?.name) where.name = { contains: filter.name, mode: Prisma.QueryMode.insensitive };
    if (filter?.email) where.email = { contains: filter.email, mode: Prisma.QueryMode.insensitive };
    if (filter?.searchTerm) {
        where.OR = [
            { name: { contains: filter.searchTerm, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: filter.searchTerm, mode: Prisma.QueryMode.insensitive } },
        ];
    }
    return where;
};
