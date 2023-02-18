import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import AccountConnectionBarrier from 'components/AccountConnectionBarrier';
import Accounts from 'components/Accounts';
import Button from 'components/Button';
import Home from 'components/Home';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import MonthlySummaryPage from 'components/MonthlySummaryPage';
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

  const home = (
    <AccountConnectionBarrier>
      <Home />
    </AccountConnectionBarrier>
  );

  const monthlySummary = (
    <AccountConnectionBarrier>
      <MonthlySummaryPage />
    </AccountConnectionBarrier>
  );

  const spending = (
    <AccountConnectionBarrier>
      <Spending />
    </AccountConnectionBarrier>
  );

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
          <Link href="/monthly-summary">Monthly Summary</Link>
        </li>
        <li>
          <Button onClick={logout}>Logout</Button>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={home} />
        <Route path="/months/:month/" element={home} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/monthly-summary" element={monthlySummary} />
        <Route path="/spending" element={spending} />
      </Routes>
    </>
  );
};

export default Greenbacks;
