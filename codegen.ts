
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/typeDefs.ts",
  documents: ["app/**/*.{ts,tsx}", "graphql/queries/*.gql"],
  generates: {
    "./graphql/types.ts": {
      plugins: ["typescript-operations", "typescript", 'typed-document-node'],
      config: {
        skipTypename: true,
      },
    },
    "./graphql/resolvers/types.ts": {
      preset: 'import-types',
      plugins: [
        "typescript-resolvers",
      ],  
      presetConfig: {
        typesPath: '../types'
      },
      config: {
        scalars: {
          DateTime: "Date",
          JSON: "object",
        },
      },
    },
  }
};

export default config;
