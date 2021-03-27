import React, { FunctionComponent } from 'react';

import { useAuth } from 'auth';

const Login: FunctionComponent = () => {
  const { loginWithRedirect } = useAuth();

  return (
    <button onClick={() => loginWithRedirect()} type="button">
      Login
    </button>
  );
};

export default Login;
