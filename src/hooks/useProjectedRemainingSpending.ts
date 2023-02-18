import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction from 'types/transaction';

const useProjectedRemainingSpending = ({
  dayInMonth,
  daysInMonth,
}: {
  dayInMonth: number;
  daysInMonth: number;
}): { isLoading: boolean; projectedRemainingSpending?: number } => {
  const {
    count: averagingCount,
    endIso: lastDayOfAveragingPeriod,
    startIso: firstDayOfAveragingPeriod,
  } = useAveragingPeriod();
  const {
    isLoading,
    spending: averagingPeriodSpending,
  } = useTransactionsByCategory({
    endDate: lastDayOfAveragingPeriod,
    startDate: firstDayOfAveragingPeriod,
  });
  if (isLoading) return { isLoading };
  const projectedRemainingSpendingByDay = getProjectedRemainingSpendingByDay({
    averagingCount,
    daysInMonth,
    spending: averagingPeriodSpending,
  });
  return {
    isLoading,
    projectedRemainingSpending: projectedRemainingSpendingByDay[dayInMonth],
  };
};

const getProjectedRemainingSpendingByDay = ({
  averagingCount,
  daysInMonth,
  spending = [],
}: {
  averagingCount: number;
  daysInMonth: number;
  spending?: Transaction[];
}): Record<number, number> => {
  const totalSpendingByDay = getTotalSpendingByDay({ spending });
  const averageSpendingByDay = getAverageSpendingByDay({
    averagingCount,
    totalSpendingByDay,
  });
  return getAverageRemainingSpendingByDay({
    averageSpendingByDay,
    daysInMonth,
  });
};

const getTotalSpendingByDay = ({
  spending = [],
}: { spending?: Transaction[] } = {}): Record<number, number> => {
  const totalSpendingByDay: Record<number, number> = {};
  spending.forEach((transaction) => {
    const { amount, datetime } = transaction;
    const day = parseInt(datetime.split('-')[2], 10);
    const totalAmount = totalSpendingByDay[day] || 0;
    totalSpendingByDay[day] = totalAmount + amount;
  });
  return totalSpendingByDay;
};

const getAverageSpendingByDay = ({
  averagingCount,
  totalSpendingByDay,
}: {
  averagingCount: number;
  totalSpendingByDay: Record<number, number>;
}): Record<number, number> => {
  const averageSpendingByDay: Record<string, number> = {};
  Object.entries(totalSpendingByDay).forEach(([day, totalSpending]) => {
    averageSpendingByDay[day] = totalSpending / averagingCount;
  });
  return averageSpendingByDay;
};

const getAverageRemainingSpendingByDay = ({
  averageSpendingByDay,
  daysInMonth,
}: {
  averageSpendingByDay: Record<number, number>;
  daysInMonth: number;
}): Record<number, number> => {
  const averageRemainingSpendingByDay: Record<number, number> = {};
  const sortedAverageSpendingByDay = Object.entries(averageSpendingByDay)
    .map(([day, amount]) => [parseInt(day, 10), amount])
    .filter(([day]) => day <= daysInMonth)
    .sort(([dayA], [dayB]) => (dayA > dayB ? -1 : 1));
  sortedAverageSpendingByDay.forEach(([day], index) => {
    if (index === 0) {
      averageRemainingSpendingByDay[day] = 0;
      return;
    }
    const [nextDay, nextDayAmount] = sortedAverageSpendingByDay[index - 1];
    const nextDayTotal = averageRemainingSpendingByDay[nextDay];
    averageRemainingSpendingByDay[day] = nextDayTotal + nextDayAmount;
  });
  return averageRemainingSpendingByDay;
};

export default useProjectedRemainingSpending;
