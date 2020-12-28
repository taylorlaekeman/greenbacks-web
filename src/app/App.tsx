import React, { FunctionComponent } from 'react';

import { Provider as ApiProvider } from 'api';
import AuthenticationBarrier from 'app/AuthenticationBarrier';
import { Provider as AuthProvider } from 'auth';
import Greenbacks from 'components/Greenbacks';
import Login from 'components/Login';

const App : FunctionComponent = () => (
  <AuthProvider
    audience="https://greenbacks"
    clientId="KO3di6CbUea9Cy6kafI5prCOsNPdZuEk"
    domain="dev-ql06dx5h.us.auth0.com"
    redirectUri={window.location.origin}
  >
    <AuthenticationBarrier LoginComponent={Login}>
      <ApiProvider uri="http://localhost:8000/dev/graphql">
        <Greenbacks />
      </ApiProvider>
    </AuthenticationBarrier>
  </AuthProvider>
);

export default App;
