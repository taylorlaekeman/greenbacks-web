import React, { FC } from 'react';
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import Checkboxes from 'components/Checkboxes';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useMonth from 'hooks/useMonth';
import useMultiselect from 'hooks/useMultiselect';
import useTransactionsByTag from 'hooks/useTransactionsByTag';
import type { TagGroup } from 'types/tagGroup';

const MonthlySpendingByTag: FC = () => {
  const {
    endDate: endOfMonth,
    nextMonth,
    previousMonth,
    readable: readableMonth,
    startDate: startOfMonth,
  } = useMonth();
  const {
    count,
    endIso: endOfAveragingPeriod,
    startIso: startOfAveragingPeriod,
  } = useAveragingPeriod();
  const {
    spending: averageSpending,
    isLoading: isLoadingAverages,
  } = useTransactionsByTag({
    endDate: endOfAveragingPeriod,
    startDate: startOfAveragingPeriod,
  });
  const { isLoading, spending } = useTransactionsByTag({
    endDate: endOfMonth,
    startDate: startOfMonth,
  });
  const orderedTags = getOrderedTags({
    averageSpending,
    averagingCount: count,
    spending,
  });
  const {
    onChange,
    onDeselectAll,
    onSelectAll,
    selectedOptions: selectedTags,
  } = useMultiselect({
    options: orderedTags,
  });
  if (isLoading || isLoadingAverages) return <LoadingIndicator />;
  const spendingBarData = formatSpendingBarData({
    averageSpending,
    averagingCount: count,
    spending,
  });
  const coloursByTag: Record<string, string> = orderedTags.reduce(
    (result, tag, index) => ({
      ...result,
      [tag]: COLOURS[index % COLOURS.length],
    }),
    {}
  );
  return (
    <>
      <Link href={`/monthly-spending-by-tag/${previousMonth}`}>previous</Link>
      <Link href={`/monthly-spending-by-tag/${nextMonth}`}>next</Link>
      <h2>Monthly Spending by Tag</h2>
      <p>{readableMonth}</p>
      <div
        data-testid="monthly-spending-by-tag-graph"
        {...getDataTags({ averageSpending, averagingCount: count, spending })}
      />
      <ResponsiveContainer
        aspect={3}
        height="max-content"
        minWidth={300}
        width="100%"
      >
        <BarChart data={spendingBarData} layout="vertical">
          {orderedTags.map((tag, index) => {
            if (!selectedTags.includes(tag)) return <></>;
            return (
              <Bar dataKey={tag} fill={coloursByTag[tag]} key={tag} stackId="a">
                <LabelList
                  formatter={(label: number) => {
                    const hundreds = Math.round(label / 10000);
                    return `${hundreds / 10}k`;
                  }}
                  valueAccessor={(entry: { value: number[] }) => {
                    const isLastTag = index === orderedTags.length - 1;
                    if (!isLastTag) return null;
                    return entry.value[1];
                  }}
                />
              </Bar>
            );
          })}
          <XAxis
            tickFormatter={(amount) => {
              if (amount < 100000) return `${amount / 100}`;
              return `${amount / 100000}k`;
            }}
            type="number"
          />
          <YAxis dataKey="label" type="category" />
        </BarChart>
      </ResponsiveContainer>
      <Checkboxes
        onChange={onChange}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
        options={orderedTags}
        selectedOptions={selectedTags}
      />
    </>
  );
};

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

const formatSpendingBarData = ({
  averageSpending,
  averagingCount,
  spending,
}: {
  averageSpending?: TagGroup[];
  averagingCount: number;
  spending?: TagGroup[];
}) => {
  const spendingGroup = spending?.reduce(
    (group, { tag, totalAmount }) => ({ ...group, [tag]: totalAmount }),
    { label: 'current' }
  );
  const averageSpendingGroup = averageSpending?.reduce(
    (group, { tag, totalAmount }) => ({
      ...group,
      [tag]: totalAmount / averagingCount,
    }),
    { label: 'average' }
  );
  return [spendingGroup, averageSpendingGroup];
};

const getOrderedTags = ({
  averageSpending,
  averagingCount,
  spending,
}: {
  averageSpending?: TagGroup[];
  averagingCount: number;
  spending?: TagGroup[];
}): string[] => {
  const amountByTag: Record<string, number> = {};
  spending?.forEach(({ tag, totalAmount }) => {
    amountByTag[tag] = totalAmount;
  });
  averageSpending?.forEach(({ tag, totalAmount }) => {
    const currentAmount = amountByTag[tag] || 0;
    amountByTag[tag] = currentAmount + totalAmount / averagingCount;
  });
  return Object.entries(amountByTag)
    .sort((first, second) => (first[1] > second[1] ? -1 : 1))
    .map(([firstTag]) => firstTag);
};

const COLOURS = [
  'lightblue',
  'pink',
  'yellow',
  'orange',
  'lightgreen',
  'purple',
];

export default MonthlySpendingByTag;
