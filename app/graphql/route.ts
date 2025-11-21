import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { schema } from '@/graphql/schema';
import { auth } from '@/lib/auth';

const server = new ApolloServer({ 
  schema,
  status400ForVariableCoercionErrors: true,
});

// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const session = await auth.api.getSession({ headers: req.headers });
    const user = session?.user ?? null;
    return { request: req, session, user };
  }
});

// required to open apollo server
export async function GET(request: NextRequest): Promise<Response> {
  return handler(request);
}

// where queries will be sent
export async function POST(request: NextRequest): Promise<Response> {
  return handler(request);
}