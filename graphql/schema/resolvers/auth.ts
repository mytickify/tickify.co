import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { AuthPayload, User } from '../types';
import { RegisterInput, LoginInput } from '../inputs';

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() _ctx: any): Promise<User | null> {
    return null;
  }

  @Mutation(() => AuthPayload)
  async register(@Arg('input') input: RegisterInput): Promise<AuthPayload> {
    return { token: 'placeholder-token', user: { id: 'temp-id', name: input.name, email: input.email } as any };
  }

  @Mutation(() => AuthPayload)
  async login(@Arg('input') input: LoginInput): Promise<AuthPayload> {
    return { token: 'placeholder-token', user: { id: 'temp-id', name: input.email.split('@')[0], email: input.email } as any };
  }
}