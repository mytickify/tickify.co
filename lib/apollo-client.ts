import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import { Route } from 'next';

const APOLLO_URI: Route = '/graphql';

const httpLink = new HttpLink({
  uri: APOLLO_URI,
});

const authLink = new SetContextLink((prevContext, _) => {
  // Get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      headers: {
      ...prevContext.headers,
      //authorization: token ? `Bearer ${token}` : "",
    },
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;