import type { ApolloError } from 'hooks/useQuery';
import useTransactions from 'hooks/useTransactions';
import Transaction from 'types/unfilteredTransaction';

const useExpenses = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { error?: ApolloError; expenses?: Transaction[]; isLoading: boolean } => {
  const { debits, error, isLoading } = useTransactions({ endDate, startDate });
  const expenses = debits?.filter(
    ({ name }) =>
      name !== 'EFT Withdrawal to CDN SHR INVEST' &&
      name !== 'EFT Withdrawal to WSII' &&
      name !==
        'Recurring Internet Withdrawal to Tangerine Savings Account - Down Payment - 3037686588'
  );
  return {
    error,
    expenses,
    isLoading,
  };
};

export default useExpenses;
