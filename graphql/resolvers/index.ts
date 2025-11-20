import { eventsResolvers } from './events';
import { subscriptionResolvers } from './subscription';
import { authResolvers } from './auth';
import { pageResolvers } from './page';
import { userResolvers } from './user';
import { categoriesResolvers } from './categories';

import { DateTimeResolver, JSONResolver } from 'graphql-scalars';

import type { Resolvers } from '@/graphql/resolvers/types';

export const resolvers: Resolvers = {
  Query: {
    ...eventsResolvers.Query,
    ...pageResolvers.Query,
    ...subscriptionResolvers.Query,
    ...authResolvers.Query,
    ...userResolvers.Query,
    ...categoriesResolvers.Query,
  },
  Mutation: {
    ...eventsResolvers.Mutation,
    ...pageResolvers.Mutation,
    ...subscriptionResolvers.Mutation,
    ...authResolvers.Mutation,
  },
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
};