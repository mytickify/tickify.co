import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from '@/lib/graphql/typeDefs';
import resolvers from '@/lib/graphql/resolvers';
import { NextRequest, NextResponse } from 'next/server';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server)

// required to open apollo server
export async function GET(request: NextRequest): Promise<Response> {
  return handler(request);
}

// where queries will be sent
export async function POST(request: NextRequest): Promise<Response> {
  return handler(request);
}