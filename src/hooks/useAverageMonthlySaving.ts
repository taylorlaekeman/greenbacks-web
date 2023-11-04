import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import type { ApolloError } from 'hooks/useQuery';

const useAverageMonthlyExpenses = ({ months }: { months?: number } = {}): {
  averageMonthlySaving?: number;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const { count, endIso: endDate, startIso: startDate } = useAveragingPeriod({
    months,
  });
  const { error, isLoading, saving } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  if (!saving) return { error, isLoading };
  const total = saving.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlySaving = total && total / count;
  return {
    averageMonthlySaving,
    error,
    isLoading,
  };
};

export default useAverageMonthlyExpenses;
