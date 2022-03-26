import type { MockedApiResponse } from 'context/GreenbacksApi';
import { GET_TRANSACTIONS_QUERY, Transaction } from 'hooks/useTransactions';

const buildApiTransactionsMock = ({
  endDate = '2020-06-30',
  startDate = '2020-01-01',
  transactions = [],
}: Input = {}): MockedApiResponse => ({
  request: {
    query: GET_TRANSACTIONS_QUERY,
    variables: { endDate, startDate },
  },
  result: {
    data: {
      transactions,
    },
  },
});

interface Input {
  endDate?: string;
  startDate?: string;
  transactions?: Transaction[];
}

export default buildApiTransactionsMock;
