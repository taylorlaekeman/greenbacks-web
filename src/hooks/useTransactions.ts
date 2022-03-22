import gql from 'utils/gql';
import useQuery from 'hooks/useQuery';

const useTransactions: UseTransactions = ({ endDate, startDate }) => {
  const { data, loading: isLoading } = useQuery<QueryResult, QueryInput>(
    GET_TRANSACTIONS_QUERY,
    {
      variables: { endDate, startDate },
    }
  );
  const transactions = data?.transactions || [];
  return { isLoading, transactions };
};

export type UseTransactions = (
  input: UseTransactionsInput
) => UseTransactionsResult;

export interface UseTransactionsInput {
  endDate: string;
  startDate: string;
}

export interface UseTransactionsResult {
  isLoading: boolean;
  transactions: Transaction[];
}

export interface Transaction {
  amount: number;
  datetime: string;
  merchant: string;
  name: string;
}

interface QueryResult {
  transactions: Transaction[];
}

interface QueryInput {
  endDate: string;
  startDate: string;
}

export const GET_TRANSACTIONS_QUERY = gql`
  query GetTransactions($startDate: String!, $endDate: String!) {
    transactions(input: { startDate: $startDate, endDate: $endDate }) {
      amount
      datetime
      merchant
      name
    }
  }
`;

export default useTransactions;
