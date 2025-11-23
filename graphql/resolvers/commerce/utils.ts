import prisma from '@/lib/prisma';

export function isAdminForUserId(userId: string | undefined | null) {
    if (!userId) return Promise.resolve(false);
    return prisma.userRole.findMany({ where: { userId }, include: { role: true } })
        .then((urs) => urs.some((ur: any) => ['ADMIN', 'ADMIN_WEB'].includes(ur.role?.name)));
}
