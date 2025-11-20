import { Resolvers } from '@/graphql/resolvers/types';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';

export const pageResolvers: Resolvers = {
  Query: {
    pages: async () => {
      return prisma.page.findMany({ include: { sections: true }, orderBy: { createdAt: 'desc' } });
    },
    page: async (_, { id }) => {
      return prisma.page.findUnique({ where: { id }, include: { sections: true } });
    },
    pageBySlug: async (_, { slug }) => {
      return prisma.page.findUnique({ where: { slug }, include: { sections: true } });
    },
    pagesByEvent: async (_, { eventId }) => {
      return prisma.page.findMany({ where: { eventId }, include: { sections: true } });
    },
  },
  Mutation: {
    createPage: async (_, { input }) => {
      const slug = input.slug ?? generateSlug(input.name || 'page');
      const sectionsCreate = (input.sections || []).map((s: any, idx: number) => ({
        builderId: s.builderId,
        type: String(s.type),
        order: typeof s.order === 'number' ? s.order : idx,
        data: s.data as any,
      }));

      return prisma.page.create({
        data: {
          slug,
          name: input.name,
          metadata: input.metadata as any,
          template: input.template ?? null,
          sectionData: input.sectionData ?? null,
          eventId: input.eventId ?? null,
          sections: { create: sectionsCreate },
        },
        include: { sections: true },
      });
    },
    updatePage: async (_, { id, input }) => {
      const data: any = {};
      for (const key of ['name', 'metadata', 'template', 'sectionData', 'slug', 'published']) {
        if (input[key] !== undefined) data[key] = input[key];
      }

      if (input.sections !== undefined) {
        return prisma.$transaction(async (tx: any) => {
          await tx.pageSection.deleteMany({ where: { pageId: id } });
          const updated = await tx.page.update({ where: { id }, data, include: { sections: true } });
          await tx.pageSection.createMany({
            data: (input.sections || []).map((s: any, idx: number) => ({
              pageId: id,
              builderId: s.builderId,
              type: String(s.type),
              order: typeof s.order === 'number' ? s.order : idx,
              data: s.data as any,
            })),
          });
          return tx.page.findUnique({ where: { id }, include: { sections: true } });
        });
      }

      return prisma.page.update({ where: { id }, data, include: { sections: true } });
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
  },
};