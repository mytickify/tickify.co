
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/typeDefs.ts",
  documents: "app/**/*.{ts,tsx}",
  generates: {
    "app/gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql/resolvers-types.ts": {
      plugins: [ "typescript", "typescript-resolvers"],
      config: {
        scalars: {
          DateTime: "Date",
          JSON: "object",
        },
      }
    }
  }
};

export default config;
