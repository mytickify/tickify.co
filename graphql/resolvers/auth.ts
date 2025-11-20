import { Resolvers } from "@/graphql/resolvers/types";
import { auth } from "@/lib/auth";

export const authResolvers: Resolvers = {
  Query: {
    me: async () => null,
  },
  Mutation: {
    register: async (_: any, { input }) => {
      const { token, user } = await auth.api.signUpEmail({
        body: {
          email: input.email,
          password: input.password,
          name: input.name,
        },
      });
      if (token === null) {
        throw new Error('Unknown error');
      }
      return {
        token: token as string,
        user: {
          id: user?.id || 'temp-id',
          name: user?.name || null,
          email: user?.email || input.email,
          createdAt: user?.createdAt,
          updatedAt: user?.updatedAt,
          emailVerified: user?.emailVerified,
          image: user?.image || null,
        }
      };
    },
    login: async (_: any, { input }: { input: any }) => {
      const { token, user } = await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
        },
      });
      if (token === null) {
        throw new Error('Unknown error');
      }
      return {
        token: token as string,
        user: {
          id: user?.id,
          name: user?.name || null,
          email: user?.email || input.email,
          createdAt: user?.createdAt,
          updatedAt: user?.updatedAt,
          emailVerified: user?.emailVerified,
          image: user?.image || null,
        }
      };
    },
  },
};