import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Accounts from 'components/Accounts';
import Button from 'components/Button';
import Home from 'components/Home';
import LoadingIndicator from 'components/LoadingIndicator';
import useIsApiReady from 'hooks/useIsApiReady';
import useIsAuthenticated from 'hooks/useIsAuthenticated';
import useLogin from 'hooks/useLogin';
import useLogout from 'hooks/useLogout';

const Greenbacks: FC = () => {
  const { isReady: isApiReady } = useIsApiReady();
  const { isAuthenticated } = useIsAuthenticated();
  const { login } = useLogin();
  const { logout } = useLogout();

  if (!isAuthenticated) return <Button onClick={login}>Login</Button>;

  if (!isApiReady) return <LoadingIndicator />;

  return (
    <>
      <Button onClick={logout}>Logout</Button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/months/:month/" element={<Home />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </>
  );
};

export default Greenbacks;
