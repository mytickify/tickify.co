import { Resolvers } from '@/graphql/resolvers/types';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';

export const pageMutations: Resolvers['Mutation'] = {
    createPage: async (_, { input }) => {
        const slug = input.slug ?? generateSlug(input.name || 'page');
        const sectionsCreate = (input.sections || []).map((s, idx: number) => ({
            builderId: s.builderId,
            type: s.type,
            order: typeof s.order === 'number' ? s.order : idx,
            data: s.data,
        }));

        return prisma.page.create({
            data: {
                slug,
                name: input.name,
                metadata: input.metadata,
                template: input.template ?? null,
                sectionData: input.sectionData ?? null,
                sections: { create: sectionsCreate },
            },
            include: { sections: true },
        });
    },
    updatePage: async (_, { id, input }) => {
        //const data = {};
        // for (const key of ['name', 'metadata', 'template', 'sectionData', 'slug', 'published']) {
        //   if (input[key] !== undefined) data[key] = input[key];
        // }

        if (input.sections !== undefined) {
            return prisma.$transaction(async (tx) => {
                await tx.pageSection.deleteMany({ where: { pageId: id } });
                const updated = await tx.page.update({
                    where: { id }, data: {
                        name: input.name,
                        metadata: input.metadata,
                        template: input.template,
                        sectionData: input.sectionData,
                    }, include: { sections: true }
                });
                await tx.pageSection.createMany({
                    data: (input.sections || []).map((s, idx) => ({
                        pageId: id,
                        builderId: s.builderId,
                        type: s.type,
                        order: typeof s.order === 'number' ? s.order : idx,
                        data: s.data,
                    })),
                });
                return updated;
            });
        }

        return prisma.page.update({
            where: { id }, data: {
                name: input.name,
                metadata: input.metadata,
                template: input.template,
                sectionData: input.sectionData,
            }, include: { sections: true }
        });
    },
    deletePage: async (_, { id }) => {
        await prisma.page.delete({ where: { id } });
        return true;
    },
    publishPage: async (_, { id }) => {
        return prisma.page.update({
            where: { id },
            data: { published: true, publishedAt: new Date() },
            include: { sections: true },
        });
    },
};
