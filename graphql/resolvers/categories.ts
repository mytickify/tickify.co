import prisma from '@/lib/prisma';
import { Resolvers } from '@/graphql/resolvers/types';
import { CategoryFindManyArgs } from '@/lib/generated/prisma/models';

export const categoriesResolvers: Resolvers = {
  Query: {
    categories: async (_: any, { filter }) => {
      const where: CategoryFindManyArgs['where'] = {};
      if (filter?.parentId) where.parentId = filter.parentId;
      if (filter?.IDs?.length) where.id = { in: filter.IDs };
      return prisma.category.findMany({ where, orderBy: { createdAt: 'desc' } });
    },
    category: async (_: any, { id }) => {
      return prisma.category.findUnique({ where: { id } });
    },
  },
};