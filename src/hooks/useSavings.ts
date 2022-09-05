import type { ApolloError } from 'hooks/useQuery';
import useTransactions from 'hooks/useTransactions';
import Transaction from 'types/transaction';

const useSavings = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  error?: ApolloError;
  isLoading: boolean;
  savings?: Transaction[];
} => {
  const result = useTransactions({ endDate, startDate });
  const { error, isLoading, savings } = result;
  return { error, isLoading, savings };
};

export default useSavings;
