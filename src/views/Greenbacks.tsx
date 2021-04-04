import React, { FunctionComponent } from 'react';

import { Route, Switch } from 'routing';
import Connections from 'views/Connections';
import Home from 'views/Home';

const Greenbacks: FunctionComponent = () => (
  <Switch>
    <Route path="/connections">
      <Connections />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default Greenbacks;
