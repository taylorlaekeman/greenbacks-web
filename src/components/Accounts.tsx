import React, { FC } from 'react';

import Button from 'components/Button';
import LoadingIndicator from 'components/LoadingIndicator';
import PageWrapper from 'components/PageWrapper';
import useAccounts from 'hooks/useAccounts';
import useUpdateAccountConnection from 'hooks/useUpdateAccountConnection';

const Accounts: FC = () => {
  const { accounts, isLoadingAccounts: isLoading } = useAccounts();
  const { update } = useUpdateAccountConnection();

  if (isLoading)
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
    </PageWrapper>
  );
};

export default Accounts;
