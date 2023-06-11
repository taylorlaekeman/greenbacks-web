import React, { FC } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import useMonth from 'hooks/useMonth';
import useSpendingTimeline, { DailyTotal } from 'hooks/useSpendingTimeline';

const PreviousMonthSpending: FC = () => {
  const { iso: month, nextMonth, previousMonth } = useMonth();
  const { isLoading, timeline } = useSpendingTimeline({ month });

  if (isLoading) return <LoadingIndicator />;

  if (!timeline) return <p>error</p>;

  const dataTags = getDataTags({ timeline });

  return (
    <>
      <h2>{month}</h2>
      <Link href={`/spending-timeline/${previousMonth}`}>previous</Link>
      <Link href={`/spending-timeline/${nextMonth}`}>next</Link>
      <div data-testid="spending-timeline-graph" {...dataTags} />
      <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
        <LineChart data={timeline}>
          <CartesianGrid vertical={false} />
          <Line dataKey="average" dot={false} stroke="orange" />
          <Line dataKey="predicted" dot={false} strokeDasharray="4 4" />
          <Line dataKey="actual" dot={false} />
          <XAxis dataKey="day" tick={false} tickLine={false} />
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

const getDataTags = ({
  timeline,
}: {
  timeline?: DailyTotal[];
}): Record<string, string> => {
  if (!timeline) return {};
  return timeline.reduce((tags, { actual, average, day, predicted }) => {
    const paddedDay = String(day).padStart(2, '0');
    const result: Record<string, number> = {
      ...tags,
      [`data-${paddedDay}-average`]: average,
    };
    if (actual) result[`data-${paddedDay}-actual`] = actual;
    if (predicted) result[`data-${paddedDay}-predicted`] = predicted;
    return result;
  }, {});
};

export default PreviousMonthSpending;
