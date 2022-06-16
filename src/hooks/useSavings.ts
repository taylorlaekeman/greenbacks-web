import type { ApolloError } from 'hooks/useQuery';
import useTransactions, { Transaction } from 'hooks/useTransactions';

const useSavings = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { error?: ApolloError; isLoading: boolean; savings?: Transaction[] } => {
  const { debits, error, isLoading } = useTransactions({ endDate, startDate });
  const savings = debits?.filter(
    ({ name }) =>
      name === 'EFT Withdrawal to CDN SHR INVEST' ||
      name === 'EFT Withdrawal to WSII' ||
      name ===
        'Recurring Internet Withdrawal to Tangerine Savings Account - Down Payment - 3037686588'
  );
  return {
    error,
    isLoading,
    savings,
  };
};

export default useSavings;
