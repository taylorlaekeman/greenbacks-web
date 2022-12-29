import React, { FC } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

import LoadingIndicator from 'components/LoadingIndicator';
import useTotalsByMonth, { MonthTotals } from 'hooks/useTotalsByMonth';

const MonthlySpendingGraph: FC = () => {
  const { isLoading, totalsByMonth } = useTotalsByMonth();

  if (isLoading) return <LoadingIndicator name="monthly-spending-graph" />;

  return (
    <>
      <div
        data-testid="monthly-spending-graph"
        {...getDataTags({ totalsByMonth })}
      />
      <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
        <BarChart barGap={0} data={formatData({ totalsByMonth })}>
          <Bar dataKey="spending" fill="orange" />
          <XAxis dataKey="name" interval="preserveStartEnd" reversed />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const getDataTags = ({ totalsByMonth }: { totalsByMonth?: MonthTotals[] }) =>
  totalsByMonth?.reduce((dataTags, { month, spending }) => {
    const key = `data-${month.replace(' ', '-')}`.toLowerCase();
    return {
      ...dataTags,
      [key]: spending,
    };
  }, {});

const formatData = ({
  totalsByMonth,
}: {
  totalsByMonth?: MonthTotals[];
}): { name: string; spending: number }[] => {
  if (!totalsByMonth) return [];
  const result = totalsByMonth.map(({ month, spending }) => ({
    name: month,
    spending: spending || 0,
  }));
  return result;
};

export default MonthlySpendingGraph;
