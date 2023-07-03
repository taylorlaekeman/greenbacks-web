import React, { FunctionComponent } from 'react';

import Greenbacks from 'components/Greenbacks';
import AccountConnectionProvider from 'context/AccountConnection';
import AuthProvider from 'context/Auth';
import { FiltersProvider } from 'context/Filters';
import GreenbacksApiProvider from 'context/GreenbacksApi';
import RouteProvider from 'context/Route';
import env from 'env';
import GlobalStyle from 'styles/GlobalStyle';
import styled from 'utils/styled';

const App: FunctionComponent = () => (
  <AuthProvider>
    <GreenbacksApiProvider uri={`${env.apiHost}/graphql`}>
      <AccountConnectionProvider>
        <FiltersProvider>
          <RouteProvider>
            <GlobalStyle />
            <Wrapper>
              <Greenbacks />
            </Wrapper>
          </RouteProvider>
        </FiltersProvider>
      </AccountConnectionProvider>
    </GreenbacksApiProvider>
  </AuthProvider>
);

const MAX_WIDTH = 600;

const Wrapper = styled.div`
  height: 100vh;
  max-width: ${MAX_WIDTH}px;
  padding: 8px;
  width: 100%;

  @media screen and (min-width: ${MAX_WIDTH}px) {
    margin-left: calc(50vw - ${MAX_WIDTH / 2}px);
  }
`;

export default App;
