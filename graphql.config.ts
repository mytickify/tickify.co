// .graphqlrc.ts or graphql.config.ts
export default {
  schema: './graphql/schema.graphql',
  documents: ['**/*.{graphql,gql,js,ts,jsx,tsx}', 'graphql/queries/*.gql'],
};
