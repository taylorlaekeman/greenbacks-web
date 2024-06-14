import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';

const useAverageMonthlyEarnings = ({ months }: { months?: number } = {}): {
  averageMonthlyEarning?: number;
  error?: Error;
  isLoading: boolean;
} => {
  const {
    count,
    endIso: endDate,
    startIso: startDate,
  } = useAveragingPeriod({
    months,
  });
  const { earning, error, isLoading } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const total = earning?.reduce((sum, { amount }) => sum + amount, 0) || 0;
  const averageMonthlyEarning = total / count;
  return {
    averageMonthlyEarning,
    error,
    isLoading,
  };
};

export default useAverageMonthlyEarnings;
