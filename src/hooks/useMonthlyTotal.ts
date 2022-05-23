import useTransactions from 'hooks/useTransactions';
import datetime from 'utils/datetime';

const useMonthlyTotal = ({ month }: MonthlyTotalHookInput = {}):
  | number
  | undefined => {
  const parsedMonth = month ? datetime.fromISO(month) : datetime.now();
  const startDate = parsedMonth.startOf('month').toFormat('yyyy-LL-dd');
  const endDate = parsedMonth.endOf('month').toFormat('yyyy-LL-dd');
  const { transactions } = useTransactions({
    endDate,
    startDate,
  });
  if (!transactions) return undefined;
  return transactions
    .filter(({ amount }) => amount > 0)
    .reduce((total, { amount }) => total + amount, 0);
};

export interface MonthlyTotalHookInput {
  month?: string;
}

export default useMonthlyTotal;
