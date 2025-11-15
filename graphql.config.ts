// .graphqlrc.ts or graphql.config.ts
const config = {
  schema: './graphql/schema.graphql',
  documents: ['**/*.{graphql,gql,js,ts,jsx,tsx}', 'graphql/queries/*.gql'],
};

export default config;
