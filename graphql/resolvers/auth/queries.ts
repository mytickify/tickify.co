import { Resolvers } from "@/graphql/resolvers/types";

export const authQueries: Resolvers['Query'] = {
    me: async () => null,
};
