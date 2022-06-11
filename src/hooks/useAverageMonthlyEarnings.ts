import useNow from 'hooks/useNow';
import type { ApolloError } from 'hooks/useQuery';
import useTransactions from 'hooks/useTransactions';
import datetime from 'utils/datetime';

const useAverageMonthlyEarnings: UseAverageMonthlyEarnings = () => {
  const { now } = useNow();
  const { endDate, startDate } = getDateRange({ now });
  const { credits, error, isLoading } = useTransactions({
    endDate,
    startDate,
  });
  if (!credits) return { error, isLoading };
  const total = credits.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlyEarnings = total / 6;
  return {
    averageMonthlyEarnings,
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

export type UseAverageMonthlyEarnings = () => UseAverageMonthlyEarningsResult;

export interface UseAverageMonthlyEarningsResult {
  averageMonthlyEarnings?: number;
  error?: ApolloError;
  isLoading: boolean;
}

export default useAverageMonthlyEarnings;
