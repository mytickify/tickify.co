import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import prisma from '@/lib/prisma';
import { Page, PageSection } from '../types';
import { CreatePageInput, UpdatePageInput } from '../inputs';
import { SectionType } from '../enums';
import { generateSlug } from '@/lib/utils';

@Resolver()
export class PageResolver {
  @Query(() => [Page])
  async pages(): Promise<any[]> {
    return prisma.page.findMany({ include: { sections: true }, orderBy: { createdAt: 'desc' } });
  }

  @Query(() => Page, { nullable: true })
  async page(@Arg('id', () => ID) id: string): Promise<any | null> {
    return prisma.page.findUnique({ where: { id }, include: { sections: true } });
  }

  @Query(() => Page, { nullable: true })
  async pageBySlug(@Arg('slug') slug: string): Promise<any | null> {
    return prisma.page.findUnique({ where: { slug }, include: { sections: true } });
  }

  @Query(() => [Page])
  async pagesByEvent(@Arg('eventId', () => ID) eventId: string): Promise<any[]> {
    return prisma.page.findMany({ where: { eventId }, include: { sections: true } });
  }

  @Mutation(() => Page)
  async createPage(@Arg('input') input: CreatePageInput): Promise<any> {

    const slug = input.slug ?? generateSlug(input.name || 'page');
    const sectionsCreate = (input.sections || []).map((s, idx) => ({
      builderId: s.builderId,
      type: (s.type as any) as SectionType,
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
  }

  @Mutation(() => Page)
  async updatePage(@Arg('id', () => ID) id: string, @Arg('input') input: UpdatePageInput): Promise<any> {
    const data: any = {};
    for (const key of ['name', 'metadata', 'template', 'sectionData', 'slug', 'published']) {
      if ((input as any)[key] !== undefined) data[key] = (input as any)[key];
    }

    // If sections provided, replace existing set
    if (input.sections !== undefined) {
      // delete existing and create new in a transaction
      return prisma.$transaction(async (tx: any) => {
        await tx.pageSection.deleteMany({ where: { pageId: id } });
        const updated = await tx.page.update({ where: { id }, data, include: { sections: true } });
        await tx.pageSection.createMany({
          data: (input.sections || []).map((s, idx) => ({
            pageId: id,
            builderId: s.builderId,
            type: (s.type as any) as SectionType,
            order: typeof s.order === 'number' ? s.order : idx,
            data: s.data as any,
          })),
        });
        return tx.page.findUnique({ where: { id }, include: { sections: true } });
      });
    }

    return prisma.page.update({ where: { id }, data, include: { sections: true } });
  }

  @Mutation(() => Boolean)
  async deletePage(@Arg('id', () => ID) id: string): Promise<boolean> {
    await prisma.page.delete({ where: { id } });
    return true;
  }

  @Mutation(() => Page)
  async publishPage(@Arg('id', () => ID) id: string): Promise<any> {
    return prisma.page.update({
      where: { id },
      data: { published: true, publishedAt: new Date() },
      include: { sections: true },
    });
  }
}