import React, { FC } from 'react';

import Button from 'components/Button';
import LoadingIndicator from 'components/LoadingIndicator';
import useAccounts from 'hooks/useAccounts';

const Accounts: FC = () => {
  const { accounts, isLoadingAccounts: isLoading } = useAccounts();
  if (isLoading) return <LoadingIndicator name="accounts" />;
  return (
    <ul>
      {accounts.map(
        ({ id, institution: { name }, isReauthenticationRequired }) => (
          <li data-testid={`account-wrapper-${id}`} key={id}>
            {name}
            {isReauthenticationRequired && <Button>Reauthenticate</Button>}
          </li>
        )
      )}
    </ul>
  );
};

export default Accounts;
