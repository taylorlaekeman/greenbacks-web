import useAverageMonthlyEarnings from 'hooks/useAverageMonthlyEarnings';
import useAverageMonthlySavings from 'hooks/useAverageMonthlySavings';
import type { ApolloError } from 'hooks/useQuery';

const useSavingsRate = (): {
  error?: ApolloError;
  isLoading: boolean;
  savingsRate?: number;
} => {
  const {
    averageMonthlyEarnings,
    error: earningsError,
    isLoading: isLoadingEarnings,
  } = useAverageMonthlyEarnings();
  const {
    averageMonthlySavings,
    error: savingsError,
    isLoading: isLoadingSavings,
  } = useAverageMonthlySavings();
  const error = earningsError || savingsError;
  const isLoading = isLoadingEarnings || isLoadingSavings;
  if (
    averageMonthlyEarnings === undefined ||
    averageMonthlySavings === undefined
  )
    return { error, isLoading };
  const savingsRate = averageMonthlySavings / averageMonthlyEarnings;
  return { error, isLoading, savingsRate };
};

export default useSavingsRate;
