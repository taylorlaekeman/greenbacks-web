import React, { FC } from 'react';

import AmountBadge from 'components/AmountBadge';
import PercentBadge from 'components/PercentBadge';
import Link from 'components/Link';
import MonthlyExpenses from 'components/MonthlyExpenses';
import PageWrapper from 'components/PageWrapper';
import useAverageMonthlyEarnings from 'hooks/useAverageMonthlyEarnings';
import useAverageMonthlyExpenses from 'hooks/useAverageMonthlyExpenses';
import useAverageMonthlySavings from 'hooks/useAverageMonthlySavings';
import useSavingsRate from 'hooks/useSavingsRate';
import styled from 'utils/styled';

const Home: FC = () => {
  const {
    averageMonthlyEarnings,
    error: earningsError,
    isLoading: isLoadingAverageEarnings,
  } = useAverageMonthlyEarnings();
  const {
    averageMonthlyExpenses,
    error: expensesError,
    isLoading: isLoadingAverageExpenses,
  } = useAverageMonthlyExpenses();
  const {
    averageMonthlySavings,
    error: savingsError,
    isLoading: isLoadingAverageSavings,
  } = useAverageMonthlySavings();
  const {
    savingsRate,
    error: savingsRateError,
    isLoading: isLoadingSavingsRate,
  } = useSavingsRate();

  const error =
    earningsError || expensesError || savingsError || savingsRateError;

  if (error) {
    const { message } = error;
    if (message === 'Reauthentication required for a connected account') {
      return (
        <>
          <p>At least one of your accounts needs reauthentication</p>
          <Link href="accounts">Accounts</Link>
        </>
      );
    }
  }

  return (
    <PageWrapper name="home">
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
      <MonthlyExpenses />
    </PageWrapper>
  );
};

const BadgeGrid = styled.section`
  display: grid;
  grid-gap: 30px 0;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 50px;
`;

export default Home;
