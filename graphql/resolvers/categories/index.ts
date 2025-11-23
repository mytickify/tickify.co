import { Resolvers } from '@/graphql/resolvers/types';
import { categoriesQueries } from './queries';

export const categoriesResolvers: Resolvers = {
    Query: categoriesQueries,
};
