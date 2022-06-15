import useExpenses from 'hooks/useExpenses';
import usePreviousSixMonths from 'hooks/usePreviousSixMonths';
import type { ApolloError } from 'hooks/useQuery';

const useAverageMonthlyExpenses = (): {
  averageMonthlyExpenses?: number;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const { endIso: endDate, startIso: startDate } = usePreviousSixMonths();
  const { expenses, error, isLoading } = useExpenses({ endDate, startDate });
  if (!expenses) return { error, isLoading };
  const total = expenses.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlyExpenses = total && total / 6;
  return {
    averageMonthlyExpenses,
    error,
    isLoading,
  };
};

export default useAverageMonthlyExpenses;
