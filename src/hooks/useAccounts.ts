import useQueryDefault, { IUseQuery } from 'hooks/useQuery';

const useAccounts: IUseAccounts = ({ useQuery = useQueryDefault } = {}) => {
  const {
    data: initializationTokenData,
  } = useQuery<GetInitializationTokenResult>({
    fetchPolicy: 'network-only',
    query: '{ getInitializationToken }',
  });
  const initializationToken = initializationTokenData?.getInitializationToken;
  return {
    initializationToken,
  };
};

export type IUseAccounts = (
  input?: UseAccountsInput
) => {
  initializationToken?: string;
};

export interface UseAccountsInput {
  useQuery?: IUseQuery;
}

interface GetInitializationTokenResult {
  getInitializationToken: string;
}

/*
interface GetAccountsResult {
  data: { getAccounts: Account[] };
}

interface Account {
  id: string;
  institution: {
    name: string;
  };
}
*/

export default useAccounts;
