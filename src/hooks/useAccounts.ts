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
    data: accountsResponse,
    loading: isLoadingAccounts,
  } = useQuery<AccountsResult>(ACCOUNTS_QUERY);
  const accounts = accountsResponse?.accounts || [];
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

export const ACCOUNTS_QUERY = gql`
  {
    accounts {
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

interface AccountsResult {
  accounts: Account[];
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
