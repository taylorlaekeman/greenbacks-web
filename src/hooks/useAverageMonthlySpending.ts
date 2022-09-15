import useCategorizedTransactions from 'hooks/useCategorizedTransactions';
import usePreviousSixMonths from 'hooks/usePreviousSixMonths';
import type { ApolloError } from 'hooks/useQuery';

const useAverageMonthlySpending = (): {
  averageMonthlySpending?: number;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const { endIso: endDate, startIso: startDate } = usePreviousSixMonths();
  const { error, isLoading, spending } = useCategorizedTransactions({
    endDate,
    startDate,
  });
  if (!spending) return { error, isLoading };
  const total = spending.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlySpending = total && total / 6;
  return {
    averageMonthlySpending,
    error,
    isLoading,
  };
};

export default useAverageMonthlySpending;
