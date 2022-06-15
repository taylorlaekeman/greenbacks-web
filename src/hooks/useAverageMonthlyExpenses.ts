import useExpenses from 'hooks/useExpenses';
import useNow from 'hooks/useNow';
import type { ApolloError } from 'hooks/useQuery';
import datetime from 'utils/datetime';

const useAverageMonthlyExpenses = (): UseAverageMonthlyExpensesResult => {
  const { now } = useNow();
  const { endDate, startDate } = getDateRange({ now });
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

const getDateRange = ({
  now,
}: {
  now: datetime;
}): { endDate: string; startDate: string } => {
  const startDate = now.minus({ months: 6 }).startOf('month').toISODate();
  const endDate = now.minus({ months: 1 }).endOf('month').toISODate();
  return { endDate, startDate };
};

export interface UseAverageMonthlyExpensesResult {
  averageMonthlyExpenses?: number;
  error?: ApolloError;
  isLoading: boolean;
}

export default useAverageMonthlyExpenses;
