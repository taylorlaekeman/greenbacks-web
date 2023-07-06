import React, { FC } from 'react';
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import MonthSelector from 'components/MonthSelector';
import LoadingIndicator from 'components/LoadingIndicator';
import useMonth from 'hooks/useMonth';
import useNow from 'hooks/useNow';
import useSpendingTimeline, { DailyTotal } from 'hooks/useSpendingTimeline';

const PreviousMonthSpending: FC = () => {
  const { daysInMonth, iso: month } = useMonth();
  const { now } = useNow();
  const { isLoading, timeline } = useSpendingTimeline({ month });

  const isCurrentMonth = month === now.toFormat('yyyy-LL');
  const currentDay = now.day;

  if (isLoading) return <LoadingIndicator />;

  if (!timeline) return <p>error</p>;

  const dataTags = getDataTags({ timeline });

  return (
    <>
      <h2>Spending Timeline</h2>
      <MonthSelector />
      <div data-testid="spending-timeline-graph" {...dataTags} />
      <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
        <LineChart data={timeline}>
          <CartesianGrid vertical={false} />
          <Line dataKey="average" dot={false} stroke="orange">
            <LabelList
              formatter={formatThousands}
              valueAccessor={(entry: {
                payload: { day: number };
                value: number;
              }) => {
                const {
                  payload: { day },
                } = entry;
                if (isCurrentMonth && day === currentDay) return entry.value;
                if (day === daysInMonth) return entry.value;
                return null;
              }}
            />
          </Line>
          <Line dataKey="predicted" dot={false} strokeDasharray="4 4">
            <LabelList
              formatter={formatThousands}
              valueAccessor={(entry: {
                payload: { day: number };
                value: number;
              }) => {
                const {
                  payload: { day },
                } = entry;
                if (day === daysInMonth) return entry.value;
                return null;
              }}
            />
          </Line>
          <Line dataKey="actual" dot={false}>
            <LabelList
              formatter={formatThousands}
              valueAccessor={(entry: {
                payload: { day: number };
                value: number;
              }) => {
                const {
                  payload: { day },
                } = entry;
                if (isCurrentMonth && day === currentDay) return entry.value;
                if (!isCurrentMonth && day === daysInMonth) return entry.value;
                return null;
              }}
            />
          </Line>
          <XAxis
            dataKey="day"
            padding={{ right: 20 }}
            tick={false}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickFormatter={formatThousands}
            tickLine={false}
            width={30}
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

function formatThousands(cents: number): string {
  const dollars = cents / 100;
  const hundreds = Math.round(dollars / 100);
  return `${hundreds / 10}k`;
}

export default PreviousMonthSpending;
