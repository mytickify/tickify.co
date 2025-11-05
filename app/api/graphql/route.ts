import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from '@/lib/graphql/typeDefs';
import resolvers from '@/lib/graphql/resolvers';
import { NextRequest } from 'next/server';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});
export { handler as GET, handler as POST };