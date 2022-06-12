import React, { FC } from 'react';

import AmountBadge from 'components/AmountBadge';
import Link from 'components/Link';
import MonthlyExpenses from 'components/MonthlyExpenses';
import PageWrapper from 'components/PageWrapper';
import useAverageMonthlyEarnings from 'hooks/useAverageMonthlyEarnings';
import useAverageMonthlyExpenses from 'hooks/useAverageMonthlyExpenses';

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

  const error = earningsError || expensesError;

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
