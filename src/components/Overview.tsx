import React, { FC } from 'react';

import AmountBadge from 'components/AmountBadge';
import ArticleContainer from 'components/ArticleContainer';
import PercentBadge from 'components/PercentBadge';
import useAverageMonthlyEarnings from 'hooks/useAverageMonthlyEarnings';
import useAverageMonthlyExpenses from 'hooks/useAverageMonthlyExpenses';
import useAverageMonthlySavings from 'hooks/useAverageMonthlySavings';
import useSavingsRate from 'hooks/useSavingsRate';
import styled from 'utils/styled';

const Overview: FC = () => {
  const {
    averageMonthlyEarnings,
    isLoading: isLoadingAverageEarnings,
  } = useAverageMonthlyEarnings();
  const {
    averageMonthlyExpenses,
    isLoading: isLoadingAverageExpenses,
  } = useAverageMonthlyExpenses();
  const {
    averageMonthlySavings,
    isLoading: isLoadingAverageSavings,
  } = useAverageMonthlySavings();
  const { savingsRate, isLoading: isLoadingSavingsRate } = useSavingsRate();

  return (
    <ArticleContainer id="overview" title="Overview">
      <BadgeGrid>
        <AmountBadge
          amount={averageMonthlyEarnings}
          isLoading={isLoadingAverageEarnings}
          label="Average monthly earnings"
          name="average-monthly-earnings"
        />
        <AmountBadge
          amount={averageMonthlyExpenses}
          isLoading={isLoadingAverageExpenses}
          label="Average monthly expenses"
          name="average-monthly-expenses"
        />
        <AmountBadge
          amount={averageMonthlySavings}
          isLoading={isLoadingAverageSavings}
          label="Average monthly savings"
          name="average-monthly-savings"
        />
        <PercentBadge
          isLoading={isLoadingSavingsRate}
          label="Savings rate"
          name="average-savings-rate"
          percent={savingsRate}
        />
      </BadgeGrid>
    </ArticleContainer>
  );
};

const BadgeGrid = styled.section`
  display: grid;
  grid-gap: 30px 0;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 50px;
`;

export default Overview;
