import React, { FC, useState } from 'react';

import AccountConnector from 'components/AccountConnector';
import Button from 'components/Button';
import LoadingIndicator from 'components/LoadingIndicator';
import PageWrapper from 'components/PageWrapper';
import useAccounts from 'hooks/useAccounts';
import useUpdateAccountConnection from 'hooks/useUpdateAccountConnection';

const Accounts: FC = () => {
  const {
    accounts,
    initializationToken,
    isLoadingAccounts,
    isLoadingInitializationToken,
    saveAccount,
  } = useAccounts();
  const { update } = useUpdateAccountConnection();
  const [
    isAccountConnectorVisible,
    setIsAccountConnectorVisible,
  ] = useState<boolean>(false);

  if (isLoadingAccounts)
    return (
      <PageWrapper name="accounts">
        <LoadingIndicator name="accounts" />
      </PageWrapper>
    );

  return (
    <PageWrapper name="accounts">
      <ul>
        {accounts.map(
          ({ id, institution: { name }, isReauthenticationRequired }) => (
            <li data-testid={`account-wrapper-${id}`} key={id}>
              {name}
              {isReauthenticationRequired && (
                <Button onClick={() => update?.({ accountId: id })}>
                  Reauthenticate
                </Button>
              )}
            </li>
          )
        )}
      </ul>
      <Button
        isLoading={isLoadingInitializationToken}
        onClick={() => setIsAccountConnectorVisible(true)}
      >
        Connect Account
      </Button>
      {initializationToken && isAccountConnectorVisible && (
        <AccountConnector
          onSuccess={(token) => saveAccount({ token })}
          token={initializationToken}
        />
      )}
    </PageWrapper>
  );
};

export default Accounts;
