import React, { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Accounts from 'components/Accounts';
import Filters from 'components/Filters';
import { NewFilterModalContainer } from 'components/NewFilterModal';
import { NoAccountsContainer } from 'components/NoAccounts';
import { PageContainer } from 'components/Page';
import { SpendingSummary } from 'components/SpendingSummaryPage';
import { Widgets } from 'components/Widgets';
import TagModalContext, { TagModalProvider } from 'context/TagModal';
import { UserSettingsContext } from 'context/UserSettings';
import useAccounts from 'hooks/useAccounts';
import useAddFilter from 'hooks/useAddFilter';

function Greenbacks(): React.ReactElement {
  return (
    <TagModalProvider>
      <GreenbacksInContext />
    </TagModalProvider>
  );
}

const GreenbacksInContext: FC = () => {
  const { closeModal, transactionToTag } = useContext(TagModalContext);
  const { isTestData } = useContext(UserSettingsContext);
  const { accounts, isLoadingAccounts } = useAccounts();
  const { addFilter } = useAddFilter();

  if (!isLoadingAccounts && accounts.length === 0 && !isTestData)
    return <NoAccountsContainer />;

  return (
    <PageContainer>
      {transactionToTag !== undefined && (
        <NewFilterModalContainer
          onClose={closeModal}
          onSave={(filter) => {
            addFilter({ filter });
            closeModal();
          }}
          transaction={transactionToTag}
        />
      )}
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
