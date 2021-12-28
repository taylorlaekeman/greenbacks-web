import useQueryDefault, { IUseQuery } from 'hooks/useQuery';

const useAccounts: IUseAccounts = ({ useQuery = useQueryDefault } = {}) => {
  const {
    data: initializationTokenData,
  } = useQuery<GetInitializationTokenResult>({
    fetchPolicy: 'network-only',
    query: '{ getInitializationToken }',
  });
  const initializationToken = initializationTokenData?.getInitializationToken;
  const { data: getAccountsResponse } = useQuery<GetAccountsResult>({
    query: `{ getAccounts { id institution { name } } }`,
  });
  const accounts = getAccountsResponse?.getAccounts || [];
  return {
    accounts,
    initializationToken,
  };
};

export type IUseAccounts = (
  input?: UseAccountsInput
) => {
  accounts: Account[];
  initializationToken?: string;
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

interface Account {
  id: string;
  institution: {
    name: string;
  };
}

export default useAccounts;
