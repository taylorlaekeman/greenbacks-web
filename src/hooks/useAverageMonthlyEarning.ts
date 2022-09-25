import usePreviousSixMonths from 'hooks/usePreviousSixMonths';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import type { ApolloError } from 'hooks/useQuery';

const useAverageMonthlyEarnings = (): {
  averageMonthlyEarning?: number;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const { endIso: endDate, startIso: startDate } = usePreviousSixMonths();
  const { earning, error, isLoading } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const total = earning?.reduce((sum, { amount }) => sum + amount, 0) || 0;
  const averageMonthlyEarning = total / 6;
  return {
    averageMonthlyEarning,
    error,
    isLoading,
  };
};

export default useAverageMonthlyEarnings;
