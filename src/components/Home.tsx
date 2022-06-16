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
      <MonthlyExpenses />
    </PageWrapper>
  );
};

/*
import TotalSpending from 'components/TotalSpending';
import useMonthlyTotal from 'hooks/useMonthlyTotal';
import { Link } from 'routing';
import datetime from 'utils/datetime';
import styled from 'utils/styled';

const Home: FunctionComponent = () => {
  const now = datetime.now();
  const total = useMonthlyTotal();
  return (
    <Main>
      <Link to="/connections">connections</Link>
      <TotalSpending amount={total} month={`${now.year}-${now.month}`} />
    </Main>
  );
};

const Main = styled.main`
  display: grid;
  grid-template-rows: max-content 1fr;
  height: 100%;
`;
*/

export default Home;
