import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Accounts from 'components/Accounts';
import Button from 'components/Button';
import Home from 'components/Home';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import Spending from 'components/Spending';
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
      <ul>
        <li>
          <Link href="/">Greenbacks</Link>
        </li>
        <li>
          <Link href="/accounts">Accounts</Link>
        </li>
        <li>
          <Button onClick={logout}>Logout</Button>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/months/:month/" element={<Home />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/spending" element={<Spending />} />
      </Routes>
    </>
  );
};

export default Greenbacks;
