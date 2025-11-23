import { Resolvers } from '@/graphql/resolvers/types';
import { eventsQueries } from './queries';
import { eventsMutations } from './mutations';
import { eventsTypes } from './types';

export const eventsResolvers: Resolvers = {
    Query: eventsQueries,
    Mutation: eventsMutations,
    ...eventsTypes,
};
