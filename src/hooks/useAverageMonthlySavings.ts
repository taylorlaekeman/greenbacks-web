import useSavings from 'hooks/useSavings';
import usePreviousSixMonths from 'hooks/usePreviousSixMonths';
import type { ApolloError } from 'hooks/useQuery';

const useAverageMonthlyExpenses = (): {
  averageMonthlySavings?: number;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const { endIso: endDate, startIso: startDate } = usePreviousSixMonths();
  const { error, isLoading, savings } = useSavings({ endDate, startDate });
  if (!savings) return { error, isLoading };
  const total = savings.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlySavings = total && total / 6;
  return {
    averageMonthlySavings,
    error,
    isLoading,
  };
};

export default useAverageMonthlyExpenses;
