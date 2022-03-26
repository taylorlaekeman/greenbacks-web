import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Expenses from 'components/Expenses';
import Home from 'components/Home';

const Greenbacks: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/expenses/:month/" element={<Expenses />} />
  </Routes>
);

/*
import { useRedirectLocation } from 'auth';
import Connections from 'components/Connections';
import { Redirect, Route, Switch, useLocation } from 'routing';

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
*/

export default Greenbacks;
