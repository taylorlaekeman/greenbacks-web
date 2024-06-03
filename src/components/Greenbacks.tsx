import React, { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Accounts from 'components/Accounts';
import Filters from 'components/Filters';
import { NoAccountsContainer } from 'components/NoAccounts';
import { PageContainer } from 'components/Page';
import { SpendingSummary } from 'components/SpendingSummaryPage';
import TagModal from 'components/TagModal';
import { Widgets } from 'components/Widgets';
import TagModalContext, { TagModalProvider } from 'context/TagModal';
import { UserSettingsContext } from 'context/UserSettings';
import useAccounts from 'hooks/useAccounts';

function Greenbacks(): React.ReactElement {
  return (
    <TagModalProvider>
      <GreenbacksInContext />
    </TagModalProvider>
  );
}

const GreenbacksInContext: FC = () => {
  const { transactionToTag } = useContext(TagModalContext);
  const { isTestData } = useContext(UserSettingsContext);
  const { accounts, isLoadingAccounts } = useAccounts();

  if (!isLoadingAccounts && accounts.length === 0 && !isTestData)
    return <NoAccountsContainer />;

  return (
    <PageContainer>
      {transactionToTag !== undefined && <TagModal />}
      <Routes>
        <Route path="/" element={<SpendingSummary />} />
        <Route path="/widgets/*" element={<Widgets />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/filters" element={<Filters />} />
      </Routes>
    </PageContainer>
  );
};

export default Greenbacks;
