import type { Resolvers } from '@/graphql/resolvers/types';
import { eventsResolvers } from '../events';
import { pageResolvers } from '../page';
import { subscriptionResolvers } from '../subscription';
import { authResolvers } from '../auth';
import { userResolvers } from '../user';
import { categoriesResolvers } from '../categories';
import { commerceResolvers } from '../commerce';

export const QueryResolvers: Resolvers['Query'] = {
  ...eventsResolvers.Query,
  ...pageResolvers.Query,
  ...subscriptionResolvers.Query,
  ...authResolvers.Query,
  ...userResolvers.Query,
  ...categoriesResolvers.Query,
  ...commerceResolvers.Query,
};