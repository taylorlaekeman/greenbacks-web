import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySaving from 'hooks/useAverageMonthlySaving';
import type { ApolloError } from 'hooks/useQuery';

const useSavingsRate = (): {
  error?: ApolloError;
  isLoading: boolean;
  savingsRate?: number;
} => {
  const {
    averageMonthlyEarning,
    error: earningsError,
    isLoading: isLoadingEarnings,
  } = useAverageMonthlyEarning();
  const {
    averageMonthlySaving,
    error: savingsError,
    isLoading: isLoadingSavings,
  } = useAverageMonthlySaving();
  const error = earningsError || savingsError;
  const isLoading = isLoadingEarnings || isLoadingSavings;
  if (averageMonthlyEarning === undefined || averageMonthlySaving === undefined)
    return { error, isLoading };
  const savingsRate = averageMonthlySaving / averageMonthlyEarning;
  return { error, isLoading, savingsRate };
};

export default useSavingsRate;
