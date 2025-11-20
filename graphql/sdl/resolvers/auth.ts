import { Resolvers } from "@/graphql/resolvers/types";
import { signIn, signUp, useSession } from "@/lib/auth-client";

export const authResolvers: Resolvers = {
  Query: {
    me: async () => null,
  },
  Mutation: {
    register: async (_: any, { input }) => {
      const { error, data } = await signUp.email({
        email: input.email,
        password: input.password,
        name: input.name,
      });
      if (error) {
        throw new Error(error.message);
      }
      return {
        token: data?.token as string,
        user: {
          id: data?.user?.id,
          name: data?.user?.name || null,
          email: data?.user?.email || input.email,
          createdAt: data?.user?.createdAt,
          updatedAt: data?.user?.updatedAt,
          emailVerified: data?.user?.emailVerified,
          image: data?.user?.image || null,
        }
      };
    },
    login: async (_: any, { input }: { input: any }) => {
      const { error, data } = await signIn.email({
        email: input.email,
        password: input.password,
      });
      if (error) {
        throw new Error(error.message);
      }
      return {
        token: data?.token as string,
        user: {
          id: data?.user?.id || 'temp-id',
          name: data?.user?.name || null,
          email: data?.user?.email || input.email,
          createdAt: data?.user?.createdAt,
          updatedAt: data?.user?.updatedAt,
          emailVerified: data?.user?.emailVerified,
          image: data?.user?.image || null,
        }
      };
    },
  },
};