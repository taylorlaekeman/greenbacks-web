import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { useAuth } from 'auth';
import LoadingIndicator from 'components/LoadingIndicator';
import useIsAuthenticated from 'hooks/useIsAuthenticated';

export { GraphQLError } from 'graphql';

interface ApiContext {
  isReady: boolean;
}

export const GreenbacksApiContext = React.createContext<ApiContext>({
  isReady: false,
});

const GreenbacksApiProvider: FC<Props> = ({ children, uri }) => {
  const { isAuthenticated } = useIsAuthenticated();
  const { getAccessTokenSilently } = useAuth();
  const [token, setToken] = useState<string>();

  const client = useMemo(() => {
    if (!token) return undefined;
    return getClient(uri, token);
  }, [uri, token]);

  useEffect(() => {
    if (getAccessTokenSilently && isAuthenticated) {
      const saveToken = async () => {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      };
      saveToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  if (!token) return <>{children}</>;

  if (!client) return <LoadingIndicator />;

  return (
    <ApolloProvider client={client}>
      <InnerProvider client={client}>{children}</InnerProvider>
    </ApolloProvider>
  );
};

interface Props {
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

const InnerProvider: FC<InnerProps> = ({ children, client }) => {
  const isReady = !!client;
  return (
    <GreenbacksApiContext.Provider
      value={{
        isReady,
      }}
    >
      {children}
    </GreenbacksApiContext.Provider>
  );
};

interface InnerProps {
  client?: ApolloClient<NormalizedCacheObject>;
}

export const TestGreenbacksApiProvider: FC<TestProps> = ({
  children,
  isReady,
  mocks,
}) => (
  <MockedProvider mocks={mocks}>
    <TestInnerProvider isReady={isReady}>{children}</TestInnerProvider>
  </MockedProvider>
);

interface TestProps {
  isReady?: boolean;
  mocks?: MockedApiResponse[];
}

const TestInnerProvider: FC<TestInnerProps> = ({
  children,
  isReady = true,
}) => (
  <GreenbacksApiContext.Provider value={{ isReady }}>
    {children}
  </GreenbacksApiContext.Provider>
);

interface TestInnerProps {
  isReady?: boolean;
}

export interface Transaction {
  amount: number;
  datetime: string;
  merchant: string;
  name: string;
}

export type MockedApiResponse = MockedResponse;

export default GreenbacksApiProvider;
