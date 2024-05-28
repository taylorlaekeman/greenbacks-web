import React, { FunctionComponent } from 'react';

import { configuration } from 'app/configuration';
import Greenbacks from 'components/Greenbacks';
import AccountConnectionProvider from 'context/AccountConnection';
import AuthProvider from 'context/Auth';
import { FiltersProvider } from 'context/Filters';
import GreenbacksApiProvider from 'context/GreenbacksApi';
import RouteProvider from 'context/Route';
import { UserSettingsProvider } from 'context/UserSettings';
import GlobalStyle from 'styles/GlobalStyle';

const App: FunctionComponent = () => (
  <AuthProvider>
    <GreenbacksApiProvider uri={`${configuration.apiHost}/graphql`}>
      <AccountConnectionProvider>
        <FiltersProvider>
          <RouteProvider>
            <UserSettingsProvider>
              <GlobalStyle />
              <Greenbacks />
            </UserSettingsProvider>
          </RouteProvider>
        </FiltersProvider>
      </AccountConnectionProvider>
    </GreenbacksApiProvider>
  </AuthProvider>
);

export default App;
