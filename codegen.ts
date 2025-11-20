
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
        "typescript-operations", "typescript-resolvers",
      ],  
      presetConfig: {
        typesPath: '../types'
      },
      config: {
        mappers: {
          Event: '@/lib/generated/prisma/models/Event#EventModel',
          Page: '@/lib/generated/prisma/models/Page#PageModel',
          User: '@/lib/generated/prisma/models/User#UserModel',
        },
        scalars: {
          DateTime: "Date",
          JSON: "object",
        },
      },
    },
  }
};

export default config;
