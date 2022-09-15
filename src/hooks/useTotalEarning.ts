import useCategorizedTransactions from 'hooks/useCategorizedTransactions';

const useTotalEarning = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; totalEarning?: number } => {
  const { earning, isLoading } = useCategorizedTransactions({
    endDate,
    startDate,
  });
  const totalEarning = earning?.reduce((sum, { amount }) => sum + amount, 0);
  return { isLoading, totalEarning };
};

export default useTotalEarning;
