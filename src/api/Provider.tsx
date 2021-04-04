import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAuth } from 'auth';

const Provider: FunctionComponent<propTypes> = ({
  children,
  uri,
}: propTypes) => {
  const { getAccessTokenSilently } = useAuth();
  const [token, setToken] = useState('');
  const client = useMemo(() => getClient(uri, token), [uri, token]);

  useEffect(() => {
    const saveToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
    };
    saveToken();
  }, [getAccessTokenSilently]);

  if (!token) return <h1>loading</h1>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

interface propTypes {
  children: ReactNode;
  uri: string;
}

const getClient = (uri: string, token: string) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }));
  const httpLink = createHttpLink({ uri });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export default Provider;
