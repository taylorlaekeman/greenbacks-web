import gql from 'utils/gql';
import useQuery, { ApolloError } from 'hooks/useQuery';

const useTransactions: UseTransactions = ({ endDate, startDate }) => {
  const { data, error, loading: isLoading } = useQuery<QueryResult, QueryInput>(
    GET_TRANSACTIONS_QUERY,
    {
      variables: { endDate, startDate },
    }
  );
  const transactions = data?.transactions || [];
  return { error, isLoading, transactions };
};

export type UseTransactions = (
  input: UseTransactionsInput
) => UseTransactionsResult;

export interface UseTransactionsInput {
  endDate: string;
  startDate: string;
}

export interface UseTransactionsResult {
  error?: ApolloError;
  isLoading: boolean;
  transactions?: Transaction[];
}

export interface Transaction {
  amount: number;
  datetime: string;
  id: string;
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
      id
      merchant
      name
    }
  }
`;

export default useTransactions;
