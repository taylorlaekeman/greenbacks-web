import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useAccounts from 'hooks/useAccounts';

const Accounts: FC = () => {
  const { accounts, isLoadingAccounts: isLoading } = useAccounts();
  if (isLoading) return <LoadingIndicator name="accounts" />;
  return (
    <ul>
      {accounts.map(({ id, institution: { name } }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

export default Accounts;
