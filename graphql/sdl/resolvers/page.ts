import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';

export const pageResolvers = {
  Query: {
    pages: async () => {
      const db = prisma as any;
      return db.page.findMany({ include: { sections: true }, orderBy: { createdAt: 'desc' } });
    },
    page: async (_: any, { id }: { id: string }) => {
      const db = prisma as any;
      return db.page.findUnique({ where: { id }, include: { sections: true } });
    },
    pageBySlug: async (_: any, { slug }: { slug: string }) => {
      const db = prisma as any;
      return db.page.findUnique({ where: { slug }, include: { sections: true } });
    },
    pagesByEvent: async (_: any, { eventId }: { eventId: string }) => {
      const db = prisma as any;
      return db.page.findMany({ where: { eventId }, include: { sections: true } });
    },
  },
  Mutation: {
    createPage: async (_: any, { input }: { input: any }) => {
      const db = prisma as any;
      const slug = input.slug ?? generateSlug(input.name || 'page');
      const sectionsCreate = (input.sections || []).map((s: any, idx: number) => ({
        builderId: s.builderId,
        type: String(s.type),
        order: typeof s.order === 'number' ? s.order : idx,
        data: s.data as any,
      }));

      return db.page.create({
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
    updatePage: async (_: any, { id, input }: { id: string; input: any }) => {
      const db = prisma as any;
      const data: any = {};
      for (const key of ['name', 'metadata', 'template', 'sectionData', 'slug', 'published']) {
        if (input[key] !== undefined) data[key] = input[key];
      }

      if (input.sections !== undefined) {
        return db.$transaction(async (tx: any) => {
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

      return db.page.update({ where: { id }, data, include: { sections: true } });
    },
    deletePage: async (_: any, { id }: { id: string }) => {
      const db = prisma as any;
      await db.page.delete({ where: { id } });
      return true;
    },
    publishPage: async (_: any, { id }: { id: string }) => {
      const db = prisma as any;
      return db.page.update({
        where: { id },
        data: { published: true, publishedAt: new Date() },
        include: { sections: true },
      });
    },
  },
};