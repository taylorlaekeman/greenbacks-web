import React, { FC } from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
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
import useNow from 'hooks/useNow';
import useSpendingTimeline, { DailyTotal } from 'hooks/useSpendingTimeline';

const PreviousMonthSpending: FC = () => {
  const month = useMonth();
  const { isLoading, timeline } = useSpendingTimeline({ month });

  if (isLoading) return <LoadingIndicator />;

  if (!timeline) return <p>error</p>;

  const dataTags = getDataTags({ timeline });

  return (
    <>
      <h2>{month}</h2>
      <Link href={`/previous-month-spending/${getPreviousMonth(month)}`}>
        previous
      </Link>
      <Link href={`/previous-month-spending/${getNextMonth(month)}`}>next</Link>
      <div data-testid="spending-timeline-graph" {...dataTags} />
      <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
        <LineChart data={timeline}>
          <CartesianGrid vertical={false} />
          <Line dataKey="average" dot={false} stroke="orange" />
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

const useMonth = (): string => {
  const { month } = useParams();
  const { now } = useNow();
  if (month) return DateTime.fromISO(month).toFormat('yyyy-LL');
  return now.toFormat('yyyy-LL');
};

const getDataTags = ({
  timeline,
}: {
  timeline?: DailyTotal[];
}): Record<string, string> => {
  if (!timeline) return {};
  return timeline.reduce(
    (tags, { actual, average, day }) => ({
      ...tags,
      [`data-${day}-actual`]: actual,
      [`data-${day}-average`]: average,
    }),
    {}
  );
};

const getPreviousMonth = (month: string): string =>
  DateTime.fromISO(month).minus({ months: 1 }).toFormat('yyyy-LL');

const getNextMonth = (month: string): string =>
  DateTime.fromISO(month).plus({ months: 1 }).toFormat('yyyy-LL');

export default PreviousMonthSpending;
