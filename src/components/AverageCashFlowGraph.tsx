import React, { FC } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySaving from 'hooks/useAverageMonthlySaving';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';

const AverageCashFlowGraph: FC = () => {
  const {
    averageMonthlyEarning: earning,
    isLoading: isLoadingAverageEarning,
  } = useAverageMonthlyEarning();
  const {
    averageMonthlySpending: spending,
    isLoading: isLoadingAverageSpending,
  } = useAverageMonthlySpending();
  const {
    averageMonthlySaving: saving,
    isLoading: isLoadingAverageSaving,
  } = useAverageMonthlySaving();

  const isLoading =
    isLoadingAverageEarning ||
    isLoadingAverageSpending ||
    isLoadingAverageSaving;

  if (isLoading) return null;

  return (
    <>
      <div
        data-earning={Math.round(earning || 0)}
        data-saving={Math.round(saving || 0)}
        data-spending={Math.round(spending || 0)}
        data-testid="average-cash-flow-graph"
      />
      <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={formatData({
              earning,
              saving,
              spending,
            })}
            dataKey="amount"
            fill="#8884d8"
            nameKey="name"
            outerRadius={80}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

const formatData = ({
  earning,
  saving,
  spending,
}: {
  earning?: number;
  saving?: number;
  spending?: number;
}): { amount: number; name: string }[] => {
  if (!earning || !saving || !spending) return [];
  const result = [
    { amount: earning, fill: 'green', name: 'Earning' },
    { amount: spending, fill: 'orange', name: 'Spending' },
    { amount: saving, fill: 'blue', name: 'Saving' },
  ];
  return result;
};

export default AverageCashFlowGraph;
