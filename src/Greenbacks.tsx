import React, { FunctionComponent } from 'react';

import { useAuth } from 'auth';

const Greenbacks: FunctionComponent<propTypes> = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth();

  console.log({ isAuthenticated, user });

  if (!isAuthenticated)
    return (
      <button onClick={() => loginWithRedirect()}>Login</button>
    );

  return (
    <>
      <div>{user.name}</div>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

type propTypes = {};

export default Greenbacks;
