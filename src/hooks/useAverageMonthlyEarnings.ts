import usePreviousSixMonths from 'hooks/usePreviousSixMonths';
import type { ApolloError } from 'hooks/useQuery';
import useTransactions from 'hooks/useTransactions';

const useAverageMonthlyEarnings = (): {
  averageMonthlyEarnings?: number;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const { endIso: endDate, startIso: startDate } = usePreviousSixMonths();
  const { earnings, error, isLoading } = useTransactions({
    endDate,
    startDate,
  });
  const total = earnings?.reduce((sum, { amount }) => sum + amount, 0) || 0;
  const averageMonthlyEarnings = total / 6;
  return {
    averageMonthlyEarnings,
    error,
    isLoading,
  };
};

export default useAverageMonthlyEarnings;
