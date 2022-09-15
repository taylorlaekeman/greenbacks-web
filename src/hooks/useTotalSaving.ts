import useCategorizedTransactions from 'hooks/useCategorizedTransactions';

const useTotalSaving = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; totalSaving?: number } => {
  const { isLoading, saving } = useCategorizedTransactions({
    endDate,
    startDate,
  });
  const totalSaving = saving?.reduce((sum, { amount }) => sum + amount, 0);
  return { isLoading, totalSaving };
};

export default useTotalSaving;
