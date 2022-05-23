import React, { FC } from 'react';

import Button from 'components/Button';
import LoadingIndicator from 'components/LoadingIndicator';
import useAccounts from 'hooks/useAccounts';
import useUpdateAccountConnection from 'hooks/useUpdateAccountConnection';

const Accounts: FC = () => {
  const { accounts, isLoadingAccounts: isLoading } = useAccounts();
  const { update } = useUpdateAccountConnection();

  if (isLoading)
    return (
      <PageWrapper>
        <LoadingIndicator name="accounts" />
      </PageWrapper>
    );
  return (
    <PageWrapper>
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

const PageWrapper: FC = ({ children }) => (
  <main data-testid="accounts-page">{children}</main>
);

export default Accounts;
