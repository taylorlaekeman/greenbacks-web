import useTransactions from 'hooks/useTransactions';

const useTotalSpending = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; totalSpending?: number } => {
  const { expenses, isLoading } = useTransactions({ endDate, startDate });
  const totalSpending = expenses?.reduce((sum, { amount }) => sum + amount, 0);
  return { isLoading, totalSpending };
};

export default useTotalSpending;
