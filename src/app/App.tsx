import React, { FunctionComponent } from 'react';

import { Provider as ApiProvider } from 'api';
import AuthenticationBarrier from 'app/AuthenticationBarrier';
import { Provider as AuthProvider } from 'auth';
import GlobalStyle from 'styles/GlobalStyle';
import Router from 'routing';
import styled from 'utils/styled';
import Greenbacks from 'views/Greenbacks';
import Login from 'views/Login';

const App: FunctionComponent = () => (
  <AuthProvider
    audience="https://greenbacks"
    clientId="KO3di6CbUea9Cy6kafI5prCOsNPdZuEk"
    domain="dev-ql06dx5h.us.auth0.com"
    redirectUri={window.location.origin}
  >
    <AuthenticationBarrier LoginComponent={Login}>
      <ApiProvider uri="http://localhost:8000/dev/graphql">
        <GlobalStyle />
        <Wrapper>
          <Router>
            <Greenbacks />
          </Router>
        </Wrapper>
      </ApiProvider>
    </AuthenticationBarrier>
  </AuthProvider>
);

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
