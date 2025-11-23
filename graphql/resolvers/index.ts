import { QueryResolvers } from './query';
import { MutationResolvers } from './mutation';
import { eventsResolvers } from './events';
import { commerceResolvers } from './commerce';

import { DateTimeResolver, JSONResolver } from 'graphql-scalars';

import type { Resolvers } from '@/graphql/resolvers/types';

export const resolvers: Resolvers = {
  Query: {
    ...QueryResolvers,
  },
  Mutation: {
    ...MutationResolvers,
  },
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
  Customer: commerceResolvers.Customer,
  Order: commerceResolvers.Order,
  Ticket: commerceResolvers.Ticket,
  Event: eventsResolvers.Event,
};