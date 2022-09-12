import useTransactions from 'hooks/useTransactions';

const useTotalSaving = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; totalSaving?: number } => {
  const { isLoading, savings } = useTransactions({ endDate, startDate });
  const totalSaving = savings?.reduce((sum, { amount }) => sum + amount, 0);
  return { isLoading, totalSaving };
};

export default useTotalSaving;
