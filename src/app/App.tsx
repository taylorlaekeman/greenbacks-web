import React, { FunctionComponent } from 'react';

import Greenbacks from 'components/Greenbacks';
import AccountConnectionProvider from 'context/AccountConnection';
import AuthProvider from 'context/Auth';
import { FiltersProvider } from 'context/Filters';
import GreenbacksApiProvider from 'context/GreenbacksApi';
import RouteProvider from 'context/Route';
import env from 'env';
import GlobalStyle from 'styles/GlobalStyle';

const App: FunctionComponent = () => (
  <AuthProvider>
    <GreenbacksApiProvider uri={`${env.apiHost}/graphql`}>
      <AccountConnectionProvider>
        <FiltersProvider>
          <RouteProvider>
            <GlobalStyle />
            <Greenbacks />
          </RouteProvider>
        </FiltersProvider>
      </AccountConnectionProvider>
    </GreenbacksApiProvider>
  </AuthProvider>
);

export default App;
