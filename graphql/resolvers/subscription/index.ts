import { subscriptionQueries } from './queries';
import { subscriptionMutations } from './mutations';

export const subscriptionResolvers = {
    Query: subscriptionQueries,
    Mutation: subscriptionMutations,
};
