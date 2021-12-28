import React, { FunctionComponent } from 'react';

import { useRedirectLocation } from 'auth';
import Connections from 'components/Connections';
import { Redirect, Route, Switch, useLocation } from 'routing';
import Home from 'views/Home';

const Greenbacks: FunctionComponent = () => {
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
