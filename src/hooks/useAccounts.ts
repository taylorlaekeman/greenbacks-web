import useMutation from 'hooks/useMutation';
import useQuery from 'hooks/useQuery';
import gql from 'utils/gql';

const useAccounts: UseAccounts = () => {
  const {
    data: initializationTokenData,
    loading: isLoadingInitializationToken,
  } = useQuery<GetInitializationTokenResult>(
    gql`
      {
        getInitializationToken
      }
    `,
    {
      fetchPolicy: 'network-only',
    }
  );
  const initializationToken = initializationTokenData?.getInitializationToken;
  const {
    data: getAccountsResponse,
    loading: isLoadingAccounts,
  } = useQuery<GetAccountsResult>(GET_ACCOUNTS_QUERY);
  const accounts = getAccountsResponse?.getAccounts || [];
  const { mutate: saveAccount } = useMutation<SaveAccountVariables>({
    mutation: SAVE_ACCOUNT_MUTATION,
  });
  return {
    accounts,
    initializationToken,
    isLoadingAccounts,
    isLoadingInitializationToken,
    saveAccount: ({ token }) => {
      saveAccount({ variables: { token } });
    },
  };
};

const GET_ACCOUNTS_QUERY = gql`
  {
    getAccounts {
      createdDate
      id
      modifiedDate
      institution {
        name
      }
    }
  }
`;

export type UseAccounts = () => UseAccountsResult;

export interface UseAccountsResult {
  accounts: Account[];
  initializationToken?: string;
  isLoadingAccounts: boolean;
  isLoadingInitializationToken: boolean;
  saveAccount: (input: SaveAccountInput) => void;
}

interface GetInitializationTokenResult {
  getInitializationToken: string;
}

interface GetAccountsResult {
  getAccounts: Account[];
}

export type Account = {
  createdDate: string;
  id: string;
  modifiedDate: string;
  institution: {
    name: string;
  };
};

interface SaveAccountVariables {
  token: string;
}

export interface SaveAccountInput {
  token: string;
}

const SAVE_ACCOUNT_MUTATION = `
mutation saveAccount($token: String!) {
  saveAccount(input: { token: $token }) {
    id
  }
}
`;

export default useAccounts;
