import React, { FunctionComponent } from 'react';

import { useAuth } from 'auth';

const Login: FunctionComponent<propTypes> = () => {
  const { loginWithRedirect } = useAuth();

  return (
    <button onClick={() => loginWithRedirect()}>Login</button>
  );
};

interface propTypes {};

export default Login;
