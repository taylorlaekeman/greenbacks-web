import React, { FunctionComponent } from 'react';

import Greenbacks from 'components/Greenbacks';
import AccountConnectionProvider from 'context/AccountConnection';
import AuthProvider from 'context/Auth';
import GreenbacksApiProvider from 'context/GreenbacksApi';
import RouteProvider from 'context/Route';
import env from 'env';
import GlobalStyle from 'styles/GlobalStyle';
import styled from 'utils/styled';

const App: FunctionComponent = () => (
  <AuthProvider>
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
  </AuthProvider>
);

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
