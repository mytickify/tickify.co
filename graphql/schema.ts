import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolvers } from './resolvers';
import { readdirSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//console log current dirname
console.log(__dirname)
// log current files in dirname
console.log(readdirSync(__dirname))
// Load schema from schema.graphql file
const typeDefs = await loadSchema(join(__dirname, './schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

export const schema = makeExecutableSchema({ typeDefs, resolvers })