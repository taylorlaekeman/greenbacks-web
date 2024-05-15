import { DateTime } from 'luxon';

import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction from 'types/transaction';

const useSpendingByDayOfMonth = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  isLoading: boolean;
  rawTransactions?: Transaction[];
  spending?: Record<string, number>;
} => {
  const { isLoading, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  if (!spending) return { isLoading };
  const spendingByDayOfMonth = spending.reduce(
    (result: Record<string, number>, { amount, datetime }) => {
      const day = getDayOfMonth(datetime);
      const spendingSoFar = result[day] || 0;
      return { ...result, [day]: spendingSoFar + amount };
    },
    {}
  );
  return {
    isLoading,
    rawTransactions: spending,
    spending: spendingByDayOfMonth,
  };
};

const getDayOfMonth = (datetime: string): number => {
  const parsedDate = DateTime.fromISO(datetime);
  return parsedDate.day;
};

export default useSpendingByDayOfMonth;
