import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';

const useAverageMonthlySpending = ({ months }: { months?: number } = {}): {
  averageMonthlySpending?: number;
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
  const { error, isLoading, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  if (!spending) return { error, isLoading };
  const total = spending.reduce((sum, { amount }) => sum + amount, 0);
  const averageMonthlySpending = total && total / count;
  return {
    averageMonthlySpending,
    error,
    isLoading,
  };
};

export default useAverageMonthlySpending;
