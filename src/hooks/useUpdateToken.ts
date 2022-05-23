import { useLazyQuery } from '@apollo/client';

import gql from 'utils/gql';

const useUpdateToken = (): {
  fetchUpdateToken: (input: { accountId: string }) => void;
  isLoading: boolean;
  updateToken?: string;
} => {
  const [fetchUpdateToken, { data, loading: isLoading }] = useLazyQuery(
    UPDATE_TOKEN_QUERY
  );
  const { updateToken } = data || {};
  return {
    fetchUpdateToken: ({ accountId }) => {
      fetchUpdateToken({ variables: { accountId } });
    },
    isLoading,
    updateToken,
  };
};

export const UPDATE_TOKEN_QUERY = gql`
  query GetUpdateToken($accountId: ID!) {
    updateToken(input: { accountId: $accountId })
  }
`;

export default useUpdateToken;
