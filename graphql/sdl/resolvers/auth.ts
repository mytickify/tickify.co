export const authResolvers = {
  Query: {
    me: async () => null,
  },
  Mutation: {
    register: async (_: any, { input }: { input: any }) => {
      return { token: 'placeholder-token', user: { id: 'temp-id', name: input.name, email: input.email } };
    },
    login: async (_: any, { input }: { input: any }) => {
      return { token: 'placeholder-token', user: { id: 'temp-id', name: input.email.split('@')[0], email: input.email } };
    },
  },
};