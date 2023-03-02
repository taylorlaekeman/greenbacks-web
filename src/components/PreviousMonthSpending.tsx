import React, { FC } from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import LoadingIndicator from 'components/LoadingIndicator';
import useNow from 'hooks/useNow';
import useSpendingByDayOfMonth from 'hooks/useSpendingByDayOfMonth';

const PreviousMonthSpending: FC = () => {
  const { endDate, month, startDate } = useMonth();
  const { isLoading, spendingByDayOfMonth } = useSpendingByDayOfMonth({
    endDate,
    startDate,
  });

  if (isLoading) return <LoadingIndicator />;

  if (!spendingByDayOfMonth) return <p>error</p>;

  const dataTags = getDataTags({ month, spendingByDayOfMonth });
  const data = getData({ spendingByDayOfMonth });

  return (
    <>
      <h2>{month}</h2>
      <div data-testid="spending-timeline-graph" {...dataTags} />
      <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
        <LineChart data={data}>
          <Line dataKey="amount" dot={false} />
          <XAxis dataKey="day" />
          <YAxis
            axisLine={false}
            tickFormatter={(amount) => {
              if (amount < 100000) return `${amount / 100}`;
              return `${amount / 100000}k`;
            }}
            tickLine={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

const useMonth = (): { endDate: string; month: string; startDate: string } => {
  const { month } = useParams();
  const { now } = useNow();
  const datetime = getDatetime({ month, now });
  return {
    endDate: datetime.endOf('month').toISODate(),
    month: datetime.toFormat('yyyy-LL'),
    startDate: datetime.startOf('month').toISODate(),
  };
};

const getDatetime = ({
  month,
  now,
}: {
  month?: string;
  now: DateTime;
}): DateTime => {
  if (month) return DateTime.fromISO(month);
  return now.minus({ months: 1 });
};

const getDataTags = ({
  month,
  spendingByDayOfMonth,
}: {
  month?: string;
  spendingByDayOfMonth?: Record<string, number>;
}): Record<string, string> => {
  if (!spendingByDayOfMonth) return {};
  return Object.entries(spendingByDayOfMonth).reduce(
    (tags, [day, amount]) => ({
      ...tags,
      [`data-${month}-${day}`]: amount,
    }),
    {}
  );
};

const getData = ({
  spendingByDayOfMonth,
}: {
  spendingByDayOfMonth: Record<string, number>;
}): { amount: number; day: string }[] => {
  const data = Object.entries(spendingByDayOfMonth).reduce<
    {
      amount: number;
      day: string;
    }[]
  >((result, [day, amount]) => {
    const previousDay = result[result.length - 1];
    const missingDays = getMissingDays({
      currentDay: { amount, day },
      previousDay,
    });
    const runningTotal = previousDay?.amount || 0;
    const newResult = [
      ...result,
      ...missingDays,
      {
        amount: amount + runningTotal,
        day,
      },
    ];
    return newResult;
  }, []);
  return data;
};

const getMissingDays = ({
  currentDay,
  previousDay,
}: {
  currentDay: { amount: number; day: string };
  previousDay?: { amount: number; day: string };
}): { amount: number; day: string }[] => {
  const dayRange = getDayRange(previousDay?.day || '0', currentDay.day);
  const startingAmount = previousDay?.amount || 0;
  const missingDays = dayRange.map((day) => ({ amount: startingAmount, day }));
  return missingDays;
};

const getDayRange = (firstDay: string, lastDay: string): string[] => {
  const range = [];
  const parsedFirstDay = parseInt(firstDay, 10);
  const parsedLastDay = parseInt(lastDay, 10);
  for (let i = parsedFirstDay + 1; i < parsedLastDay; i += 1)
    range.push(`${i}`);
  return range;
};

export default PreviousMonthSpending;
