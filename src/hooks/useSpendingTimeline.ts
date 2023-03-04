import { DateTime } from 'luxon';

import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useSpendingByDayOfMonth from 'hooks/useSpendingByDayOfMonth';

const useSpendingTimeline = ({
  month,
}: {
  month: string;
}): {
  isLoading: boolean;
  timeline?: DailyTotal[];
} => {
  const { days, endDate, startDate } = getDateRange(month);
  const { actualSpending, averageSpending, isLoading } = useDailySpending({
    endDate,
    startDate,
  });
  if (isLoading) return { isLoading: true };
  const timeline: DailyTotal[] = [];
  for (let i = 0; i < days; i += 1) {
    const averageIncrement = averageSpending?.[i + 1] || 0;
    const actualIncrement = actualSpending?.[i + 1] || 0;
    const averageTotal = timeline[i - 1]?.average || 0;
    const actualTotal = timeline[i - 1]?.actual || 0;
    timeline.push({
      actual: actualTotal + actualIncrement,
      average: averageTotal + averageIncrement,
      day: i + 1,
    });
  }
  return {
    isLoading: false,
    timeline,
  };
};

export interface DailyTotal {
  actual: number;
  average: number;
  day: number;
}

const useDailySpending = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  actualSpending?: Record<string, number>;
  averageSpending?: Record<string, number>;
  isLoading: boolean;
} => {
  const {
    count,
    endIso: endOfAveragingPeriod,
    startIso: startOfAveragingPeriod,
  } = useAveragingPeriod();
  const {
    isLoading: isLoadingActualSpending,
    spending: actualSpending,
  } = useSpendingByDayOfMonth({
    endDate,
    startDate,
  });
  const {
    isLoading: isLoadingAverageSpending,
    spending: averageTotals,
  } = useSpendingByDayOfMonth({
    endDate: endOfAveragingPeriod,
    startDate: startOfAveragingPeriod,
  });
  if (isLoadingActualSpending || isLoadingAverageSpending)
    return { isLoading: true };
  const averageSpending = Object.entries(averageTotals || {}).reduce(
    (result, [day, amount]) => ({ ...result, [day]: amount / count }),
    {}
  );
  return { actualSpending, averageSpending, isLoading: false };
};

const getDateRange = (
  datetime: string
): { days: number; endDate: string; startDate: string } => {
  const endDate = DateTime.fromISO(datetime).endOf('month');
  return {
    days: endDate.day,
    endDate: endDate.toISODate(),
    startDate: endDate.startOf('month').toISODate(),
  };
};

export default useSpendingTimeline;
