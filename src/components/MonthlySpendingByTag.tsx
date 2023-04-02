import React, { FC } from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useNow from 'hooks/useNow';
import useTransactionsByTag from 'hooks/useTransactionsByTag';
import type { TagGroup } from 'types/tagGroup';

const MonthlySpendingByTag: FC = () => {
  const { endDate: endOfMonth, month, startDate: startOfMonth } = useMonth();
  const {
    count,
    endIso: endOfAveragingPeriod,
    startIso: startOfAveragingPeriod,
  } = useAveragingPeriod();
  const {
    isLoading: isLoadingAverages,
    spending: averageSpending,
  } = useTransactionsByTag({
    endDate: endOfAveragingPeriod,
    startDate: startOfAveragingPeriod,
  });
  const { isLoading, spending } = useTransactionsByTag({
    endDate: endOfMonth,
    startDate: startOfMonth,
  });
  if (isLoading || isLoadingAverages) return <LoadingIndicator />;
  return (
    <>
      <Link href={`/monthly-spending-by-tag/${getPreviousMonth(month)}`}>
        previous
      </Link>
      <Link href={`/monthly-spending-by-tag/${getNextMonth(month)}`}>next</Link>
      <h2>Monthly Spending by Tag</h2>
      <p>{month}</p>
      <div
        data-testid="monthly-spending-by-tag-graph"
        {...getDataTags({ averageSpending, averagingCount: count, spending })}
      />
      <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
        <BarChart
          barGap={0}
          data={formatData({
            averageSpending,
            averagingCount: count,
            spending,
          })}
        >
          <Bar dataKey="current" fill="blue" />
          <Bar dataKey="average" fill="orange" />
          <XAxis angle={270} dataKey="tag" interval={0} />
          <YAxis
            axisLine={false}
            tickFormatter={(amount) => {
              if (amount < 100000) return `${amount / 100}`;
              return `${amount / 100000}k`;
            }}
            tickLine={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const useMonth = (): { endDate: string; month: string; startDate: string } => {
  const { month } = useParams();
  const { now } = useNow();
  const monthDatetime = month ? DateTime.fromISO(month) : now;
  return {
    endDate: monthDatetime.endOf('month').toISODate(),
    month: monthDatetime.toFormat('yyyy-LL'),
    startDate: monthDatetime.startOf('month').toISODate(),
  };
};

const getPreviousMonth = (month: string): string =>
  DateTime.fromISO(month).minus({ months: 1 }).toFormat('yyyy-LL');

const getNextMonth = (month: string): string =>
  DateTime.fromISO(month).plus({ months: 1 }).toFormat('yyyy-LL');

const getDataTags = ({
  averageSpending,
  averagingCount,
  spending,
}: {
  averageSpending?: TagGroup[];
  averagingCount: number;
  spending?: TagGroup[];
}): Record<string, string> => {
  const tags: Record<string, string> = {};
  averageSpending?.forEach(({ tag, totalAmount }: TagGroup) => {
    tags[`data-${formatTag(tag)}-average`] = (
      totalAmount / averagingCount
    ).toString();
  });
  spending?.forEach(({ tag, totalAmount }: TagGroup) => {
    tags[`data-${formatTag(tag)}`] = totalAmount.toString();
  });
  return tags;
};

const formatTag = (tag: string): string =>
  tag.replace(' ', '-').replace('(', '').replace(')', '').toLowerCase();

const formatData = ({
  averageSpending,
  averagingCount,
  spending,
}: {
  averageSpending?: TagGroup[];
  averagingCount: number;
  spending?: TagGroup[];
}): TagData[] => {
  const averageAndCurrentByTag: Record<
    string,
    { average?: number; current?: number }
  > = {};
  averageSpending?.forEach(({ tag, totalAmount }: TagGroup) => {
    averageAndCurrentByTag[tag] = { average: totalAmount / averagingCount };
  });
  spending?.forEach(({ tag, totalAmount }: TagGroup) => {
    averageAndCurrentByTag[tag] = {
      ...averageAndCurrentByTag[tag],
      current: totalAmount,
    };
  });
  const result = Object.entries(averageAndCurrentByTag)
    .map(([tag, { average, current }]) => ({
      average: average || 0,
      current: current || 0,
      tag,
    }))
    .sort(
      (
        { average: firstAverage, current: firstCurrent },
        { average: secondAverage, current: secondCurrent }
      ) => {
        if (firstCurrent > secondCurrent) return -1;
        if (firstCurrent < secondCurrent) return 1;
        return firstAverage > secondAverage ? -1 : 1;
      }
    );
  return result;
};

interface TagData {
  average: number;
  current: number;
  tag: string;
}

export default MonthlySpendingByTag;
