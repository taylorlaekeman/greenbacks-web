import useExpenses from 'hooks/useExpenses';
import type { ApolloError } from 'hooks/useQuery';
import type { Transaction } from 'hooks/useTransactions';
import datetime from 'utils/datetime';

const useDailyExpenses = ({
  month,
}: {
  month: string;
}): {
  dailyExpenses?: Record<string, Transaction[]>;
  error?: ApolloError;
  isLoading: boolean;
} => {
  const parsedMonth = datetime.fromISO(month);
  const startDate = parsedMonth.startOf('month').toISODate();
  const endDate = parsedMonth.endOf('month').toISODate();
  const { error, expenses, isLoading } = useExpenses({ endDate, startDate });
  if (!expenses) return { error, isLoading };
  const dailyExpenses = expenses.reduce(
    (result: Record<string, Transaction[]>, expense) => {
      const { datetime: transactionDatetime } = expense;
      const day = datetime.fromISO(transactionDatetime).toISODate();
      const dayExpenses = result[day] || [];
      return {
        ...result,
        [day]: [...dayExpenses, expense],
      };
    },
    {}
  );
  return { dailyExpenses, error, isLoading };
};

export default useDailyExpenses;
