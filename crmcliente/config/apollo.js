import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
  fetch,
});

const authLink = setContext((_, { headers }) => {
  // Leer el token almacenado en localStorage
  const token = localStorage.getItem('token');
  
  
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

//Deshabilitando caché al momento de realizar el query
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'ignore',
  //   },
  //   query: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'all',
  //   },
  // },
});

export default client;
