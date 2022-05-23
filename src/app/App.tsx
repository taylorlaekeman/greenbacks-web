import React, { FunctionComponent } from 'react';

import { Provider as Auth0Provider } from 'auth';
import AuthenticationBarrier from 'app/AuthenticationBarrier';
import Greenbacks from 'components/Greenbacks';
import Login from 'components/Login';
import AccountConnectionProvider from 'context/AccountConnection';
import AuthProvider from 'context/Auth';
import GreenbacksApiProvider from 'context/GreenbacksApi';
import RouteProvider from 'context/Route';
import env from 'env';
import GlobalStyle from 'styles/GlobalStyle';
import styled from 'utils/styled';

const App: FunctionComponent = () => (
  <Auth0Provider
    audience="https://greenbacks"
    clientId="KO3di6CbUea9Cy6kafI5prCOsNPdZuEk"
    domain="dev-ql06dx5h.us.auth0.com"
    redirectUri={window.location.origin}
  >
    <AuthProvider>
      <AuthenticationBarrier LoginComponent={Login}>
        <GreenbacksApiProvider uri={`${env.apiHost}/graphql`}>
          <AccountConnectionProvider>
            <RouteProvider>
              <GlobalStyle />
              <Wrapper>
                <Greenbacks />
              </Wrapper>
            </RouteProvider>
          </AccountConnectionProvider>
        </GreenbacksApiProvider>
      </AuthenticationBarrier>
    </AuthProvider>
  </Auth0Provider>
);

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
