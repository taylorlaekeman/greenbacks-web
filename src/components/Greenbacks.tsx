import React, { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Accounts from 'components/Accounts';
import Button from 'components/Button';
import Filters from 'components/Filters';
import LoadingIndicator from 'components/LoadingIndicator';
import { Login } from 'components/LoginPage';
import { Page } from 'components/Page';
import { SpendingSummary } from 'components/SpendingSummaryPage';
import TagModal from 'components/TagModal';
import { Widgets } from 'components/Widgets';
import TagModalContext, { TagModalProvider } from 'context/TagModal';
import useIsApiReady from 'hooks/useIsApiReady';
import useIsAuthenticated from 'hooks/useIsAuthenticated';
import useLogin from 'hooks/useLogin';

const Greenbacks: FC = () => (
  <TagModalProvider>
    <GreenbacksInContext />
  </TagModalProvider>
);

const GreenbacksInContext: FC = () => {
  const { transactionToTag } = useContext(TagModalContext);
  const { isReady: isApiReady } = useIsApiReady();
  const { isAuthenticated } = useIsAuthenticated();
  const { login } = useLogin();

  if (!isAuthenticated) return <Login />;
  if (!isAuthenticated) return <Button onClick={login}>Login</Button>;

  if (!isApiReady) return <LoadingIndicator />;

  return (
    <Page>
      {transactionToTag !== undefined && <TagModal />}
      <Routes>
        <Route path="/" element={<SpendingSummary />} />
        <Route path="/widgets/*" element={<Widgets />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/filters" element={<Filters />} />
      </Routes>
    </Page>
  );
};

export default Greenbacks;
