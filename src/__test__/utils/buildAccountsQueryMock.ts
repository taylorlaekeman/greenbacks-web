import type { MockedApiResponse } from 'context/GreenbacksApi';
import { ACCOUNTS_QUERY } from 'hooks/useAccounts';
import type { Account } from 'types/account';

const buildAccountsQueryMock = ({
  accounts = [],
}: {
  accounts?: Account[];
} = {}): MockedApiResponse => ({
  request: { query: ACCOUNTS_QUERY },
  result: {
    data: { accounts },
  },
});

export default buildAccountsQueryMock;
