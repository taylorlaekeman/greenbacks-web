import useTransactionsByCategory from 'hooks/useTransactionsByCategory';

const useTotalEarning = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; totalEarning?: number } => {
  const { earning, isLoading } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const totalEarning = earning?.reduce((sum, { amount }) => sum + amount, 0);
  return { isLoading, totalEarning };
};

export default useTotalEarning;
