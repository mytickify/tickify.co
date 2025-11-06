import { eventsResolvers } from './events';
import { subscriptionResolvers } from './subscription';
import { authResolvers } from './auth';
import { pageResolvers } from './page';
import { userResolvers } from './user';

export const resolvers = {
  Query: {
    ...eventsResolvers.Query,
    ...pageResolvers.Query,
    ...subscriptionResolvers.Query,
    ...authResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...eventsResolvers.Mutation,
    ...pageResolvers.Mutation,
    ...subscriptionResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};