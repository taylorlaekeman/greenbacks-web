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
  console.log(transactions);
  return 7;
};

export interface MonthlyTotalHookInput {
  month?: string;
  useTransactions: TransactionsHook;
}

export default useMonthlyTotal;
