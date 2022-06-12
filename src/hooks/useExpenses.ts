import type { ApolloError } from 'hooks/useQuery';
import useTransactions, { Transaction } from 'hooks/useTransactions';

const useExpenses = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { error?: ApolloError; expenses?: Transaction[]; isLoading: boolean } => {
  const { debits, error, isLoading } = useTransactions({ endDate, startDate });
  const expenses = debits?.filter(
    ({ name }) => name !== 'EFT Withdrawal to CDN SHR INVEST'
  );
  return {
    error,
    expenses,
    isLoading,
  };
};

export default useExpenses;
