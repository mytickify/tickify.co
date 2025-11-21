import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import { Route } from 'next';
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";

const APOLLO_URI: Route = '/graphql';

const httpLink = new HttpLink({
  uri: APOLLO_URI,
  // Ensure session cookies are sent with GraphQL requests
  credentials: 'include',
});
const removeTypenameLink = new RemoveTypenameFromVariablesLink();
const link = ApolloLink.from([removeTypenameLink, httpLink]);

const authLink = new SetContextLink((prevContext) => {
  // If you use token-based auth in future, uncomment below and add header
  return {
    headers: {
      ...prevContext.headers,
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;