import React, { FunctionComponent } from 'react';

import { useQuery, queries } from 'api';
import { useAuth } from 'auth';

const Greenbacks: FunctionComponent<propTypes> = () => {
  const { logout, user } = useAuth();

  const { data, error, loading } = useQuery(queries.hello);

  if (loading)
    return (
      <p>loading...</p>
    );

  if (error)
    return (
      <>
        <h1>{user.name}</h1>
        <p>{error.message}</p>
        <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
      </>
    );

  return (
    <>
      <h1>{user.name}</h1>
      <p>{data.hello}</p>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
    </>
  );
};

type propTypes = {};

export default Greenbacks;
