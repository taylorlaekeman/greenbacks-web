import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import type { ApolloError } from 'hooks/useQuery';

const useAverageMonthlySpending = (): {
  averageMonthlySpending?: number;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const { count, endIso: endDate, startIso: startDate } = useAveragingPeriod();
  const { error, isLoading, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  if (!spending) return { error, isLoading };
  const total = spending.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlySpending = total && total / count;
  return {
    averageMonthlySpending,
    error,
    isLoading,
  };
};

export default useAverageMonthlySpending;
