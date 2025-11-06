import { eventsResolvers } from './events';
import { subscriptionResolvers } from './subscription';
import { authResolvers } from './auth';
import { pageResolvers } from './page';

export const resolvers = {
  Query: {
    ...eventsResolvers.Query,
    ...pageResolvers.Query,
    ...subscriptionResolvers.Query,
    ...authResolvers.Query,
  },
  Mutation: {
    ...eventsResolvers.Mutation,
    ...pageResolvers.Mutation,
    ...subscriptionResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};