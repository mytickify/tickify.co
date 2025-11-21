
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/schema.graphql",
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
          Customer: '@/lib/generated/prisma/models/Customer#CustomerModel',
          Order: '@/lib/generated/prisma/models/Order#OrderModel',
          Ticket: '@/lib/generated/prisma/models/Ticket#TicketModel',
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
