import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
  ServerError,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { useAuth } from 'auth';
import LoadingIndicator from 'components/LoadingIndicator';
import { Page } from 'components/Page';
import useIsAuthenticated from 'hooks/useIsAuthenticated';
import useLogout from 'hooks/useLogout';

export { GraphQLError } from 'graphql';

interface ApiContext {
  isReady: boolean;
}

export const GreenbacksApiContext = React.createContext<ApiContext>({
  isReady: false,
});

const GreenbacksApiProvider: FC<Props> = ({ children, uri }) => {
  const { isAuthenticated } = useIsAuthenticated();
  const { logout } = useLogout();
  const { getAccessTokenSilently } = useAuth();
  const [token, setToken] = useState<string>();

  const client = useMemo(() => {
    if (!token) return undefined;
    return getClient({ onAuthError: logout, token, uri });
  }, [logout, token, uri]);

  useEffect(() => {
    if (getAccessTokenSilently && isAuthenticated) {
      const saveToken = async () => {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      };
      saveToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  if (!client)
    return (
      <Page hasLinks={false}>
        <LoadingIndicator />
      </Page>
    );

  return (
    <ApolloProvider client={client}>
      <InnerProvider client={client}>{children}</InnerProvider>
    </ApolloProvider>
  );
};

interface Props {
  uri: string;
}

const getClient = ({
  onAuthError,
  token,
  uri,
}: {
  onAuthError: () => void;
  token: string;
  uri: string;
}) => {
  const authLink = setContext((_, { headers }) => {
    const result = {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
    return result;
  });
  const errorLink = onError(({ networkError }) => {
    const error = networkError as ServerError | undefined;
    if (!error?.result) return;
    const errorCode = error?.result.statusCode;
    if (errorCode === 401) onAuthError();
  });
  const httpLink = createHttpLink({ uri });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, errorLink, httpLink]), // httpLink has to be last
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
