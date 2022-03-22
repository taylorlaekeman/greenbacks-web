import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useAccountsDefault, { UseAccounts } from 'hooks/useAccounts';
import { Link } from 'routing';
import AccountConnectorDefault, {
  Props as AccountConnectorProps,
} from 'components/AccountConnector';

const Connections: FC<Props> = ({
  AccountConnector = AccountConnectorDefault,
  useAccounts = useAccountsDefault,
}) => {
  const {
    accounts,
    initializationToken,
    isLoadingAccounts,
    isLoadingInitializationToken,
    saveAccount,
  } = useAccounts();

  if (isLoadingAccounts || isLoadingInitializationToken)
    return <LoadingIndicator />;

  return (
    <>
      <Link to="/">home</Link>
      <h1>Connections</h1>
      {accounts.length === 0 && (
        <p>You haven&apos;t connected any accounts yet</p>
      )}
      <ul>
        {accounts.map(({ createdDate, id, institution: { name } }) => (
          <li key={id}>{`${name} - ${createdDate}`}</li>
        ))}
      </ul>
      {initializationToken && (
        <AccountConnector
          onSuccess={(token) => {
            saveAccount({ token });
          }}
          token={initializationToken}
        />
      )}
    </>
  );
};

interface Props {
  AccountConnector?: FC<AccountConnectorProps>;
  useAccounts?: UseAccounts;
}

export default Connections;
