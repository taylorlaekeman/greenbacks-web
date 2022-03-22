import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { useAuth } from 'auth';
import LoadingIndicator from 'components/LoadingIndicator';

export const GreenbacksApiContext = React.createContext({});

const GreenbacksApiProvider: FC<ProviderProps> = ({ children, uri }) => {
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

  if (!token) return <LoadingIndicator />;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

interface ProviderProps {
  uri: string;
}

const getClient = (uri: string, token: string) => {
  const authLink = setContext((_, { headers }) => {
    const result = {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
    return result;
  });
  const httpLink = createHttpLink({ uri });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export const TestGreenbacksApiProvider: FC<TestProviderProps> = ({
  children,
  mocks,
}) => <MockedProvider mocks={mocks}>{children}</MockedProvider>;

interface TestProviderProps {
  mocks?: MockedResponse[];
}

export interface Transaction {
  amount: number;
  datetime: string;
  merchant: string;
  name: string;
}

export default GreenbacksApiProvider;
