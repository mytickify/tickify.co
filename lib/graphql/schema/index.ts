import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import { AuthResolver } from './resolvers/auth';
import { EventResolver } from './resolvers/event';

export const typeGraphqlSchema = buildSchemaSync({ resolvers: [EventResolver, AuthResolver] });