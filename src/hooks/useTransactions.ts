import gql, { DocumentNode } from 'api/gql';
import { useQuery as useQueryDefault } from 'api/queries';

const useTransactions: TransactionsHook = ({
  endDate,
  startDate,
  useQuery = useQueryDefault,
} = {}) => {
  const { data } = useQuery<Results, Record<string, never>>(query);
  const transactions = data?.getTransactions || [];
  return filterTransactions({ endDate, startDate, transactions });
};

export type TransactionsHook = (input?: Input) => Transaction[];

interface Input {
  endDate?: string;
  startDate?: string;
  useQuery?: ApiQueryHook;
}

export type ApiQueryHook = (
  query: DocumentNode
) => { data: { getTransactions: Transaction[] } };

export interface Results {
  getTransactions: Transaction[];
}

interface Transaction {
  amount: number;
  date: string;
  name: string;
}

const query = gql`
  {
    getTransactions {
      amount
      date
      name
    }
  }
`;

const filterTransactions = ({
  endDate,
  startDate,
  transactions,
}: {
  endDate?: string;
  startDate?: string;
  transactions: Transaction[];
}) => {
  if (endDate && startDate)
    return transactions.filter(
      ({ date }) => date >= startDate && date <= endDate
    );
  if (startDate) return transactions.filter(({ date }) => date >= startDate);
  if (endDate) return transactions.filter(({ date }) => date <= endDate);
  return transactions;
};

export default useTransactions;
