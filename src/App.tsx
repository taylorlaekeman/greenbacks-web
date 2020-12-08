import React from 'react';

import { Provider } from 'auth';
import Greenbacks from 'Greenbacks';

function App() {
  return (
    <Provider
      clientId="KO3di6CbUea9Cy6kafI5prCOsNPdZuEk"
      domain="dev-ql06dx5h.us.auth0.com"
      redirectUri={window.location.origin}
    >
      <Greenbacks />
    </Provider>
  );
}

export default App;
