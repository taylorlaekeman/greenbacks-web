import React, { FunctionComponent } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useAccountsDefault, { IUseAccounts } from 'hooks/useAccounts';
import { Link } from 'routing';
// import Connector from 'views/Connector';

const Connections: FunctionComponent<Props> = ({
  useAccounts = useAccountsDefault,
}) => {
  const {
    accounts,
    isLoadingAccounts,
    isLoadingInitializationToken,
  } = useAccounts();

  if (isLoadingAccounts || isLoadingInitializationToken)
    return <LoadingIndicator />;

  return (
    <>
      <Link to="/">home</Link>
      <h1>Connections</h1>
      <ul>
        {accounts.map(({ id, institution: { name } }) => (
          <li key={id}>{`${name} (${id})`}</li>
        ))}
      </ul>
      {/* <Connector initializationToken={initializationToken || ''} /> */}
    </>
  );
};

interface Props {
  useAccounts?: IUseAccounts;
}

export default Connections;
