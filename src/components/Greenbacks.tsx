import React, { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Accounts from 'components/Accounts';
import Button from 'components/Button';
import Filters from 'components/Filters';
import { Header } from 'components/Header';
import LoadingIndicator from 'components/LoadingIndicator';
import { SpendingSummary } from 'components/SpendingSummaryPage';
import TagModal from 'components/TagModal';
import { Widgets } from 'components/Widgets';
import TagModalContext, { TagModalProvider } from 'context/TagModal';
import useIsApiReady from 'hooks/useIsApiReady';
import useIsAuthenticated from 'hooks/useIsAuthenticated';
import useLogin from 'hooks/useLogin';
import useLogout from 'hooks/useLogout';

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
  const { logout } = useLogout();

  if (!isAuthenticated) return <Button onClick={login}>Login</Button>;

  if (!isApiReady) return <LoadingIndicator />;

  return (
    <PageWrapper data-testid="home-page">
      <Header onLogout={logout} />
      <PageBody>
        {transactionToTag !== undefined && <TagModal />}
        <Routes>
          <Route path="/" element={<SpendingSummary />} />
          <Route path="/widgets/*" element={<Widgets />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/filters" element={<Filters />} />
        </Routes>
      </PageBody>
    </PageWrapper>
  );
};

const PageWrapper = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const PageBody = styled.article`
  max-width: 832px;
  overflow: scroll;
  padding: 16px;
  width: 100%;
`;

export default Greenbacks;
