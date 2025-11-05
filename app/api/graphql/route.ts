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
const handler = startServerAndCreateNextHandler(server)

// required to open apollo server
export async function GET(request: Request): Promise<Response> {
  return handler(request);
}

// where queries will be sent
export async function POST(request: Request): Promise<Response> {
  return handler(request);
}