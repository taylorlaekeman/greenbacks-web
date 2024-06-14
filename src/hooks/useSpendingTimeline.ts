import { DateTime } from 'luxon';

import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useNow from 'hooks/useNow';
import useSpendingByDayOfMonth from 'hooks/useSpendingByDayOfMonth';
import Transaction from 'types/transaction';

const useSpendingTimeline = ({
  month,
  monthsToAverage = 12,
}: {
  month: string;
  monthsToAverage?: number;
}): {
  averageSpendingByDayOfMonth?: Record<string, number>;
  isLoading: boolean;
  rawActualTransactions?: Transaction[];
  timeline?: DailyTotal[];
} => {
  const { now } = useNow();
  const currentDay = now.day;
  const { days, endDate, startDate } = getDateRange(month);
  const isCurrentMonth =
    endDate === now.endOf('month').toISODate() &&
    startDate === now.startOf('month').toISODate();
  const { actualSpending, averageSpending, isLoading, rawActualTransactions } =
    useDailySpending({
      endDate,
      monthsToAverage,
      startDate,
    });
  if (isLoading) return { isLoading: true };
  const timeline = buildTimeline({
    actualSpending,
    averageSpending,
    currentDay,
    days,
    isCurrentMonth,
  });
  return {
    averageSpendingByDayOfMonth: averageSpending,
    isLoading: false,
    rawActualTransactions,
    timeline,
  };
};

export interface DailyTotal {
  actual?: number;
  average: number;
  day: number;
  projected?: number;
}

const getDateRange = (
  datetime: string,
): { days: number; endDate: string; startDate: string } => {
  const endDate = DateTime.fromISO(datetime).endOf('month');
  return {
    days: endDate.day,
    endDate: endDate.toISODate(),
    startDate: endDate.startOf('month').toISODate(),
  };
};

const useDailySpending = ({
  endDate,
  monthsToAverage = 12,
  startDate,
}: {
  endDate: string;
  monthsToAverage?: number;
  startDate: string;
}): {
  actualSpending?: Record<string, number>;
  averageSpending?: Record<string, number>;
  isLoading: boolean;
  rawActualTransactions?: Transaction[];
} => {
  const {
    count,
    endIso: endOfAveragingPeriod,
    startIso: startOfAveragingPeriod,
  } = useAveragingPeriod({ months: monthsToAverage });
  const {
    isLoading: isLoadingActualSpending,
    spending: actualSpending,
    rawTransactions: rawActualTransactions,
  } = useSpendingByDayOfMonth({
    endDate,
    startDate,
  });
  const { isLoading: isLoadingAverageSpending, spending: averageTotals } =
    useSpendingByDayOfMonth({
      endDate: endOfAveragingPeriod,
      startDate: startOfAveragingPeriod,
    });
  if (isLoadingActualSpending || isLoadingAverageSpending)
    return { isLoading: true };
  const averageSpending = Object.entries(averageTotals || {}).reduce(
    (result, [day, amount]) => ({ ...result, [day]: amount / count }),
    {},
  );
  return {
    actualSpending,
    averageSpending,
    isLoading: false,
    rawActualTransactions,
  };
};

const buildTimeline = ({
  actualSpending,
  averageSpending,
  currentDay,
  days,
  isCurrentMonth,
}: {
  actualSpending?: Record<string, number>;
  averageSpending?: Record<string, number>;
  currentDay: number;
  days: number;
  isCurrentMonth: boolean;
}): DailyTotal[] => {
  const timeline: DailyTotal[] = [];
  for (let i = 0; i < days; i += 1) {
    const averageIncrement = averageSpending?.[i + 1] || 0;
    const actualIncrement = actualSpending?.[i + 1] || 0;
    const averageTotal = timeline[i - 1]?.average || 0;
    const actualTotal = timeline[i - 1]?.actual || 0;
    const projectedTotal = timeline[i - 1]?.projected;
    timeline.push(
      getDailyTotal({
        actualIncrement,
        actualTotal,
        averageIncrement,
        averageTotal,
        currentDay,
        day: i + 1,
        isCurrentMonth,
        projectedTotal,
      }),
    );
  }
  return timeline;
};

const getDailyTotal = ({
  actualIncrement,
  actualTotal,
  averageIncrement,
  averageTotal,
  currentDay,
  day,
  isCurrentMonth,
  projectedTotal = 0,
}: {
  actualIncrement: number;
  actualTotal: number;
  averageIncrement: number;
  averageTotal: number;
  currentDay: number;
  day: number;
  isCurrentMonth: boolean;
  projectedTotal?: number;
}): DailyTotal => {
  const result = {
    average: averageTotal + averageIncrement,
    day,
  };
  if (!isCurrentMonth || day < currentDay)
    return {
      ...result,
      actual: actualTotal + actualIncrement,
    };
  if (day === currentDay)
    return {
      ...result,
      actual: actualTotal + actualIncrement,
      projected: actualTotal + actualIncrement,
    };
  return {
    ...result,
    projected: (projectedTotal || actualTotal) + averageIncrement,
  };
};

export default useSpendingTimeline;
