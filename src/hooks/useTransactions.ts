import gql, { DocumentNode } from 'api/gql';
import { useQuery as useApiQuery, QueryResult } from 'api/queries';

const useTransactions = (
  { endDate, startDate, useQuery }: Input = {
    useQuery: useApiQuery,
  }
): Transaction[] => {
  const variables: Variables = {};
  if (endDate) variables.endDate = endDate;
  const { data } = useQuery<Results, Variables>(query, { variables });
  const transactions = data?.getTransactions || [];
  return filterTransactions({ startDate, transactions });
};

interface Input {
  endDate?: string;
  startDate?: string;
  useQuery: <QueryResults, Variables>(
    query: DocumentNode,
    config: { variables: Variables }
  ) => QueryResult<QueryResults>;
}

export interface Variables {
  endDate?: string;
}

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
  startDate,
  transactions,
}: {
  startDate?: string;
  transactions: Transaction[];
}) => {
  if (startDate) return transactions.filter(({ date }) => date >= startDate);
  return transactions;
};

export default useTransactions;
