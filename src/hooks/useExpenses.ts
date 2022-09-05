import type { ApolloError } from 'hooks/useQuery';
import useTransactions from 'hooks/useTransactions';
import Transaction from 'types/unfilteredTransaction';

const useExpenses = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { error?: ApolloError; expenses?: Transaction[]; isLoading: boolean } => {
  const { error, expenses, isLoading } = useTransactions({
    endDate,
    startDate,
  });
  return { error, expenses, isLoading };
};

export default useExpenses;
