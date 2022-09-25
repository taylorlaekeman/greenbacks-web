import useTransactionsByCategory from 'hooks/useTransactionsByCategory';

const useTotalSpending = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; totalSpending?: number } => {
  const { isLoading, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const totalSpending = spending?.reduce((sum, { amount }) => sum + amount, 0);
  return { isLoading, totalSpending };
};

export default useTotalSpending;
