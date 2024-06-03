import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';

const useSpendingRate = (): {
  error?: Error;
  isLoading: boolean;
  spendingRate?: number;
} => {
  const {
    averageMonthlyEarning,
    error: earningsError,
    isLoading: isLoadingEarnings,
  } = useAverageMonthlyEarning();
  const {
    averageMonthlySpending,
    error: savingsError,
    isLoading: isLoadingSpending,
  } = useAverageMonthlySpending();
  const error = earningsError || savingsError;
  const isLoading = isLoadingEarnings || isLoadingSpending;
  if (
    averageMonthlyEarning === undefined ||
    averageMonthlyEarning === 0 ||
    averageMonthlySpending === undefined
  )
    return { error, isLoading };
  const spendingRate = averageMonthlySpending / averageMonthlyEarning;
  return { error, isLoading, spendingRate };
};

export default useSpendingRate;
