import React, { FC } from 'react';

import AmountBadge from 'components/AmountBadge';
import ArticleContainer from 'components/ArticleContainer';
import PercentBadge from 'components/PercentBadge';
import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySaving from 'hooks/useAverageMonthlySaving';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';
import useSavingsRate from 'hooks/useSavingsRate';
import styled from 'utils/styled';

const Overview: FC = () => {
  const {
    averageMonthlyEarning,
    isLoading: isLoadingAverageEarning,
  } = useAverageMonthlyEarning();
  const {
    averageMonthlySpending,
    isLoading: isLoadingAverageSpending,
  } = useAverageMonthlySpending();
  const {
    averageMonthlySaving,
    isLoading: isLoadingAverageSaving,
  } = useAverageMonthlySaving();
  const { savingsRate, isLoading: isLoadingSavingsRate } = useSavingsRate();

  return (
    <ArticleContainer id="overview" title="Overview">
      <BadgeGrid>
        <AmountBadge
          amount={averageMonthlyEarning}
          isLoading={isLoadingAverageEarning}
          label="Average monthly earning"
          name="average-monthly-earnings"
        />
        <AmountBadge
          amount={averageMonthlySpending}
          isLoading={isLoadingAverageSpending}
          label="Average monthly spending"
          name="average-monthly-expenses"
        />
        <AmountBadge
          amount={averageMonthlySaving}
          isLoading={isLoadingAverageSaving}
          label="Average monthly saving"
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
