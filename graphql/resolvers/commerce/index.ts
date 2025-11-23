import { Resolvers } from '@/graphql/resolvers/types';
import { commerceQueries } from './queries';
import { commerceTypes } from './types';

export const commerceResolvers: Resolvers = {
    Query: commerceQueries,
    ...commerceTypes,
};
