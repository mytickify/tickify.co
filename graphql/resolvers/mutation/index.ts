import type { Resolvers } from '@/graphql/resolvers/types';
import { eventsResolvers } from '../events';
import { pageResolvers } from '../page';
import { subscriptionResolvers } from '../subscription';
import { authResolvers } from '../auth';
import { userResolvers } from '../user';

export const MutationResolvers: Resolvers['Mutation'] = {
  ...eventsResolvers.Mutation,
  ...pageResolvers.Mutation,
  ...subscriptionResolvers.Mutation,
  ...authResolvers.Mutation,
  ...userResolvers.Mutation,
};