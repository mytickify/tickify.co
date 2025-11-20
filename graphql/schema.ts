import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDefs';
import { resolvers as baseResolvers } from './resolvers';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';

const resolvers = {
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
  ...baseResolvers,
};

export const typeGraphqlSchema = makeExecutableSchema({ typeDefs, resolvers,  });