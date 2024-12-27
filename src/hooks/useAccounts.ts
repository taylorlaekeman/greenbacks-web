import useMutation from 'hooks/useMutation';
import useQuery from 'hooks/useQuery';
import gql from 'utils/gql';

function useAccounts(): {
  accounts: Account[];
  isLoading: boolean;
  isLoadingAccounts: boolean;
  saveAccount: (input: SaveAccountInput) => void;
} {
  const { data: accountsResponse, loading: isLoading } =
    useQuery<AccountsResult>(ACCOUNTS_QUERY);
  const accounts = accountsResponse?.accounts || [];
  const { mutate: saveAccount } = useMutation<SaveAccountVariables>({
    mutation: SAVE_ACCOUNT_MUTATION,
  });
  return {
    accounts,
    isLoading,
    isLoadingAccounts: isLoading,
    saveAccount: ({ token }) => {
      saveAccount({ variables: { token } });
    },
  };
}

export const ACCOUNTS_QUERY = gql`
  {
    accounts {
      createdDate
      id
      modifiedDate
      institution {
        name
      }
      isReauthenticationRequired
    }
  }
`;

interface AccountsResult {
  accounts: Account[];
}

export interface Account {
  createdDate: string;
  id: string;
  modifiedDate: string;
  institution: {
    name: string;
  };
  isReauthenticationRequired: boolean;
}

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
