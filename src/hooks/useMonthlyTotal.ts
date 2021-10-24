import useTransactionsDefault, {
  TransactionsHook,
} from 'hooks/useTransactions';
import datetime from 'utils/datetime';

const useMonthlyTotal = ({
  month,
  useTransactions = useTransactionsDefault,
}: MonthlyTotalHookInput): number => {
  const parsedMonth = month ? datetime.fromISO(month) : datetime.now();
  const startDate = parsedMonth.startOf('month').toString();
  const endDate = parsedMonth.endOf('month').toString();
  const transactions = useTransactions({
    endDate,
    startDate,
  });
  return transactions
    .filter(({ amount }) => amount > 0)
    .reduce((total, { amount }) => total + amount, 0);
};

export interface MonthlyTotalHookInput {
  month?: string;
  useTransactions: TransactionsHook;
}

export default useMonthlyTotal;
