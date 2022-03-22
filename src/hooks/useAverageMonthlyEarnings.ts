import useNow from 'hooks/useNow';
import useTransactions from 'hooks/useTransactions';
import datetime from 'utils/datetime';

const useAverageMonthlyEarnings: UseAverageMonthlyEarnings = () => {
  const { now } = useNow();
  const { endDate, startDate } = getDateRange({ now });
  const { isLoading, transactions } = useTransactions({
    endDate,
    startDate,
  });
  const earnings = transactions.filter(({ amount }) => amount < 0);
  const total = earnings.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlyEarnings = Math.abs(total) / 6;
  return {
    averageMonthlyEarnings,
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
  averageMonthlyEarnings: number;
  isLoading: boolean;
}

export default useAverageMonthlyEarnings;
