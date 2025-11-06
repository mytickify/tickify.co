import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import { Route } from 'next';

const APOLLO_URI: Route = '/graphql';

const httpLink = new HttpLink({
  uri: APOLLO_URI,
  // Ensure session cookies are sent with GraphQL requests
  credentials: 'include',
});

const authLink = new SetContextLink((prevContext, _) => {
  // If you use token-based auth in future, uncomment below and add header
  // const token = localStorage.getItem('token');
  return {
    headers: {
      ...prevContext.headers,
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;