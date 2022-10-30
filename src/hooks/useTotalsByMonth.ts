import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction from 'types/transaction';
import datetime from 'utils/datetime';
import getMonth from 'utils/getMonth';
import getReadableMonth from 'utils/getReadableMonth';

const useTotalsByMonth = (): {
  isLoading: boolean;
  totalsByMonth?: MonthTotals[];
} => {
  const { endIso: endDate, startIso: startDate } = useAveragingPeriod();
  const { earning, isLoading, saving, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const earningByMonth = getTotalsByMonth({ transactions: earning });
  const savingByMonth = getTotalsByMonth({ transactions: saving });
  const spendingByMonth = getTotalsByMonth({ transactions: spending });
  const totalsByMonth = combineMonthlyTotals({
    earningByMonth,
    savingByMonth,
    spendingByMonth,
  });
  return { isLoading, totalsByMonth };
};

const getTotalsByMonth = ({
  transactions,
}: {
  transactions?: Transaction[];
}): Record<string, number> | undefined => {
  if (!transactions) return undefined;
  return transactions.reduce<Record<string, number>>(
    (
      totalsByMonth: Record<string, number>,
      { amount, datetime: transactionDate }: Transaction
    ) => {
      const { iso: month } = getMonth({
        datetime: datetime.fromISO(transactionDate),
      });
      const currentAmount = totalsByMonth[month] || 0;
      return { ...totalsByMonth, [month]: currentAmount + amount };
    },
    {}
  );
};

const combineMonthlyTotals = ({
  earningByMonth,
  savingByMonth,
  spendingByMonth,
}: {
  earningByMonth?: Record<string, number>;
  savingByMonth?: Record<string, number>;
  spendingByMonth?: Record<string, number>;
}): MonthTotals[] => {
  const totalsByMonth: Record<string, MonthTotals> = {};
  if (earningByMonth)
    Object.entries(earningByMonth).forEach(([month, total]) => {
      const result = totalsByMonth[month] || {};
      result.earning = total;
      result.month = month;
      totalsByMonth[month] = result;
    });
  if (savingByMonth)
    Object.entries(savingByMonth).forEach(([month, total]) => {
      const result = totalsByMonth[month] || {};
      result.saving = total;
      result.month = month;
      totalsByMonth[month] = result;
    });
  if (spendingByMonth)
    Object.entries(spendingByMonth).forEach(([month, total]) => {
      const result = totalsByMonth[month] || {};
      result.spending = total;
      result.month = month;
      totalsByMonth[month] = result;
    });
  return Object.values(totalsByMonth)
    .sort(({ month: firstMonth }, { month: secondMonth }) =>
      firstMonth > secondMonth ? -1 : 1
    )
    .map((monthlyTotal) => ({
      ...monthlyTotal,
      month: getReadableMonth({ iso: monthlyTotal.month }),
    }));
};

interface MonthTotals {
  earning?: number;
  month: string;
  saving?: number;
  spending?: number;
}

export default useTotalsByMonth;
