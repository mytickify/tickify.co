import { Resolvers } from '@/graphql/resolvers/types';
import { pageQueries } from './queries';
import { pageMutations } from './mutations';

export const pageResolvers: Resolvers = {
    Query: pageQueries,
    Mutation: pageMutations,
};
