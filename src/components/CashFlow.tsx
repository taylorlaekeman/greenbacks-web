import React, { FC, useState } from 'react';
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import ArticleContainer from 'components/ArticleContainer';
import LoadingIndicator from 'components/LoadingIndicator';
import RadioButtons from 'components/RadioButtons';
import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySaving from 'hooks/useAverageMonthlySaving';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';

const CashFlow: FC = () => {
  const [selectedAverage, setSelectedAverage] = useState<string>('12');
  const monthsToAverage = parseInt(selectedAverage, 10);
  const {
    averageMonthlyEarning,
    isLoading: isLoadingAverageEarning,
  } = useAverageMonthlyEarning({ months: monthsToAverage });
  const {
    averageMonthlySpending,
    isLoading: isLoadingAverageSpending,
  } = useAverageMonthlySpending({ months: monthsToAverage });
  const {
    averageMonthlySaving,
    isLoading: isLoadingAverageSaving,
  } = useAverageMonthlySaving({ months: monthsToAverage });

  const isLoading =
    isLoadingAverageEarning ||
    isLoadingAverageSaving ||
    isLoadingAverageSpending;

  if (isLoading) return <LoadingIndicator />;

  return (
    <ArticleContainer id="cashflow" title="Cashflow">
      <RadioButtons
        label="Average"
        onChange={(value) => setSelectedAverage(value)}
        options={[
          { label: '3 month', value: '3' },
          { label: '6 month', value: '6' },
          { label: '12 month', value: '12' },
        ]}
        value={selectedAverage}
      />
      <Graph
        earning={averageMonthlyEarning}
        saving={averageMonthlySaving}
        spending={averageMonthlySpending}
      />
    </ArticleContainer>
  );
};

const Graph: FC<{
  earning?: number;
  saving?: number;
  spending?: number;
}> = ({ earning = 0, saving = 0, spending = 0 }) => (
  <ResponsiveContainer
    aspect={3}
    height="max-content"
    minWidth={300}
    width="100%"
  >
    <BarChart data={[{ earning, saving, spending }]} layout="vertical">
      <Bar dataKey="earning" fill="green" stackId="a">
        <LabelList
          formatter={(label: number) => {
            const hundreds = Math.round(label / 10000);
            return `${hundreds / 10}k`;
          }}
          position="right"
        />
      </Bar>
      <Bar dataKey="saving" fill="blue" stackId="b">
        <LabelList
          formatter={(label: number) => {
            const hundreds = Math.round(label / 10000);
            return `${hundreds / 10}k`;
          }}
        />
      </Bar>
      <Bar dataKey="spending" fill="orange" stackId="b">
        <LabelList
          formatter={(label: number) => {
            const hundreds = Math.round(label / 10000);
            return `${hundreds / 10}k`;
          }}
          valueAccessor={(entry: { spending: number }) => entry.spending}
        />
        <LabelList
          formatter={(label: number) => {
            const hundreds = Math.round(label / 10000);
            return `${hundreds / 10}k`;
          }}
          position="right"
        />
      </Bar>
      <XAxis
        padding={{ right: 20 }}
        tickFormatter={(amount) => {
          if (amount < 100000) return `${amount / 100}`;
          return `${amount / 100000}k`;
        }}
        type="number"
      />
      <YAxis dataKey="label" hide type="category" />
    </BarChart>
  </ResponsiveContainer>
);

export default CashFlow;
