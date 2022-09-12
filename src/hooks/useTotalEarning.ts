import useTransactions from 'hooks/useTransactions';

const useTotalEarning = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; totalEarning?: number } => {
  const { earnings, isLoading } = useTransactions({ endDate, startDate });
  const totalEarning = earnings?.reduce((sum, { amount }) => sum + amount, 0);
  return { isLoading, totalEarning };
};

export default useTotalEarning;
