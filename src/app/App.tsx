import React, { FunctionComponent } from 'react';

import GreenbacksApiProvider from 'context/GreenbacksApi';
import AuthenticationBarrier from 'app/AuthenticationBarrier';
import { Provider as AuthProvider } from 'auth';
import Greenbacks from 'components/Greenbacks';
import Login from 'components/Login';
import RouteProvider from 'context/Route';
import env from 'env';
import GlobalStyle from 'styles/GlobalStyle';
import styled from 'utils/styled';

const App: FunctionComponent = () => (
  <AuthProvider
    audience="https://greenbacks"
    clientId="KO3di6CbUea9Cy6kafI5prCOsNPdZuEk"
    domain="dev-ql06dx5h.us.auth0.com"
    redirectUri={window.location.origin}
  >
    <AuthenticationBarrier LoginComponent={Login}>
      <GreenbacksApiProvider uri={`${env.apiHost}/graphql`}>
        <RouteProvider>
          <GlobalStyle />
          <Wrapper>
            <Greenbacks />
          </Wrapper>
        </RouteProvider>
      </GreenbacksApiProvider>
    </AuthenticationBarrier>
  </AuthProvider>
);

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
