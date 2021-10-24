import useTransactionsDefault, {
  TransactionsHook,
} from 'hooks/useTransactions';
import datetime from 'utils/datetime';

const useMonthlyTotal = ({
  useTransactions = useTransactionsDefault,
}: MonthlyTotalHookInput): number => {
  const transactions = useTransactions({
    endDate: datetime.now().endOf('month').toString(),
    startDate: datetime.now().startOf('month').toString(),
  });
  console.log(transactions);
  return 7;
};

export interface MonthlyTotalHookInput {
  useTransactions: TransactionsHook;
}

export default useMonthlyTotal;
