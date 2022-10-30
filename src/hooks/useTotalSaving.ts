import useTransactionsByCategory from 'hooks/useTransactionsByCategory';

const useTotalSaving = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; totalSaving?: number } => {
  const { isLoading, saving } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const totalSaving = saving?.reduce((sum, { amount }) => sum + amount, 0);
  return { isLoading, totalSaving };
};

export default useTotalSaving;
