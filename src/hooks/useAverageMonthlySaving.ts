import useCategorizedTransactions from 'hooks/useCategorizedTransactions';
import usePreviousSixMonths from 'hooks/usePreviousSixMonths';
import type { ApolloError } from 'hooks/useQuery';

const useAverageMonthlyExpenses = (): {
  averageMonthlySaving?: number;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const { endIso: endDate, startIso: startDate } = usePreviousSixMonths();
  const { error, isLoading, saving } = useCategorizedTransactions({
    endDate,
    startDate,
  });
  if (!saving) return { error, isLoading };
  const total = saving.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlySaving = total && total / 6;
  return {
    averageMonthlySaving,
    error,
    isLoading,
  };
};

export default useAverageMonthlyExpenses;
