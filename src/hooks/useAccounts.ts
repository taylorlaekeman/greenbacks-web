import useQueryDefault, { IUseQuery } from 'hooks/useQuery';

const useAccounts: IUseAccounts = ({ useQuery = useQueryDefault } = {}) => {
  const {
    data: initializationTokenData,
  } = useQuery<GetInitializationTokenResult>({
    fetchPolicy: 'network-only',
    query: '{ getInitializationToken }',
  });
  const initializationToken = initializationTokenData?.getInitializationToken;
  const {
    data: getAccountsResponse,
    isLoading: isLoadingAccounts,
  } = useQuery<GetAccountsResult>({
    query: `{ getAccounts { id institution { name } } }`,
  });
  const accounts = getAccountsResponse?.getAccounts || [];
  return {
    accounts,
    initializationToken,
    isLoadingAccounts,
  };
};

export type IUseAccounts = (
  input?: UseAccountsInput
) => {
  accounts: Account[];
  initializationToken?: string;
  isLoadingAccounts: boolean;
};

export interface UseAccountsInput {
  useQuery?: IUseQuery;
}

interface GetInitializationTokenResult {
  getInitializationToken: string;
}

interface GetAccountsResult {
  getAccounts: Account[];
}

type Account = {
  id: string;
  institution: {
    name: string;
  };
};

export default useAccounts;
