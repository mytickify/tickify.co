
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./lib/graphql/typeDefs.ts",
  documents: "app/**/*.{ts,tsx}",
  generates: {
    "app/gql/": {
      preset: "client",
      plugins: []
    },
    "./lib/graphql/resolvers-types.ts": {
      plugins: [ "typescript", "typescript-resolvers"]
    }
  }
};

export default config;
