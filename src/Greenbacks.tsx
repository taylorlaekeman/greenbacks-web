import React, { FunctionComponent } from 'react';

import { useAuth } from 'auth';

const Greenbacks: FunctionComponent<propTypes> = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth();

  if (!isAuthenticated)
    return (
      <button onClick={() => loginWithRedirect()}>Login</button>
    );

  return (
    <>
      <h1>{user.name}</h1>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
    </>
  );
};

type propTypes = {};

export default Greenbacks;
