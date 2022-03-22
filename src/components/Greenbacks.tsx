import React, { FC } from 'react';

import { useRedirectLocation } from 'auth';
import Connections from 'components/Connections';
import Home from 'components/Home';
import NumericBadge from 'components/NumericBadge';
import useAverageMonthlyEarnings from 'hooks/useAverageMonthlyEarnings';
import useAverageMonthlyExpenses from 'hooks/useAverageMonthlyExpenses';
import { Redirect, Route, Switch, useLocation } from 'routing';

const Greenbacks: FC = () => {
  const {
    averageMonthlyEarnings,
    isLoading: isLoadingAverageEarnings,
  } = useAverageMonthlyEarnings();
  const {
    averageMonthlyExpenses,
    isLoading: isLoadingAverageExpenses,
  } = useAverageMonthlyExpenses();

  return (
    <>
      <NumericBadge
        amount={averageMonthlyEarnings}
        isLoading={isLoadingAverageEarnings}
        label="Average monthly earnings over the last 6 months"
        name="average-monthly-earnings"
      />
      <NumericBadge
        amount={averageMonthlyExpenses}
        isLoading={isLoadingAverageExpenses}
        label="Average monthly expenses"
        name="average-monthly-expenses"
      />
    </>
  );
};

export const OldGreenbacks: FC = () => {
  const { clearRedirectLocation, getRedirectLocation } = useRedirectLocation();
  const { pathname } = useLocation();

  const redirectLocation = getRedirectLocation();

  if (redirectLocation && redirectLocation !== pathname)
    return <Redirect to={redirectLocation} />;

  clearRedirectLocation();

  return (
    <Switch>
      <Route path="/connections">
        <Connections />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Greenbacks;
