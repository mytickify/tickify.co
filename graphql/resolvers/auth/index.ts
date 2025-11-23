import { Resolvers } from "@/graphql/resolvers/types";
import { authQueries } from "./queries";
import { authMutations } from "./mutations";

export const authResolvers: Resolvers = {
    Query: authQueries,
    Mutation: authMutations,
};
