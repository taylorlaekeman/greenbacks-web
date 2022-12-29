import React, { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

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
          <CartesianGrid strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="name" interval="preserveStartEnd" reversed />
          <YAxis
            axisLine={false}
            tickFormatter={(amount) => {
              if (amount < 100000) return `${amount / 100}`;
              return `${amount / 100000}k`;
            }}
            tickLine={false}
          />
          <Bar dataKey="spending" fill="orange" />
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
