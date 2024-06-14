import { useLazyQuery } from '@apollo/client';

import gql from 'utils/gql';

const useInitializationToken = (): {
  fetchInitializationToken: () => void;
  isLoading: boolean;
  token?: string;
} => {
  const [fetchInitializationToken, { data, loading: isLoading }] =
    useLazyQuery(QUERY);
  const { getInitializationToken: token } = data || {};
  return { fetchInitializationToken, isLoading, token };
};

const QUERY = gql`
  query GetInitializationToken {
    getInitializationToken
  }
`;

export default useInitializationToken;
