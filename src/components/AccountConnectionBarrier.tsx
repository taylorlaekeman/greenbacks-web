import React, { FC } from 'react';

import Link from 'components/Link';
import useHasAccounts from 'hooks/useHasAccounts';
import useReauthenticationRequired from 'hooks/useReauthenticationRequired';

const AccountConnectionBarrier: FC = ({ children }) => {
  const { isReauthenticationRequired } = useReauthenticationRequired();
  const { hasAccounts, isLoading: isLoadingAccounts } = useHasAccounts();

  if (isReauthenticationRequired)
    return (
      <>
        <p>At least one of your accounts needs reauthentication</p>
        <Link href="accounts">Accounts</Link>
      </>
    );

  if (!isLoadingAccounts && !hasAccounts)
    return (
      <div data-testid="no-accounts-page">
        <p>No accounts!</p>
      </div>
    );

  return <>{children}</>;
};

export default AccountConnectionBarrier;
