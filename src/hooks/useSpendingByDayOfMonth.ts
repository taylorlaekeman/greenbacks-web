import { DateTime } from 'luxon';

import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction from 'types/transaction';
import { GroupBy, groupTransactions } from 'utils/groupTransactions';

const useSpendingByDayOfMonth = ({
  endDate,
  isTestData,
  startDate,
}: {
  endDate: string;
  isTestData?: boolean;
  startDate: string;
}): {
  isLoading: boolean;
  monthCount: number;
  rawTransactions?: Transaction[];
  spending?: Record<string, number>;
} => {
  const { isLoading, spending } = useTransactionsByCategory({
    endDate,
    isTestData,
    startDate,
  });
  if (!spending) return { isLoading, monthCount: 0 };
  const transactionsByMonth =
    groupTransactions({
      groupBy: GroupBy.Month,
      transactions: spending,
    }) ?? [];
  const spendingByDayOfMonth = spending.reduce(
    (result: Record<string, number>, { amount, datetime }) => {
      const day = getDayOfMonth(datetime);
      const spendingSoFar = result[day] || 0;
      return { ...result, [day]: spendingSoFar + amount };
    },
    {},
  );
  return {
    isLoading,
    monthCount: transactionsByMonth.length,
    rawTransactions: spending,
    spending: spendingByDayOfMonth,
  };
};

const getDayOfMonth = (datetime: string): number => {
  const parsedDate = DateTime.fromISO(datetime);
  return parsedDate.day;
};

export default useSpendingByDayOfMonth;
