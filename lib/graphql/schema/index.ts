import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import { AuthResolver } from './resolvers/auth';
import { EventResolver } from './resolvers/event';
import { SubscriptionResolver } from './resolvers/subscription';

export const typeGraphqlSchema = buildSchemaSync({ resolvers: [EventResolver, SubscriptionResolver, AuthResolver] });