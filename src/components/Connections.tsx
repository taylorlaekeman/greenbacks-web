import React, { FunctionComponent } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useAccountsDefault, { IUseAccounts } from 'hooks/useAccounts';
import { Link } from 'routing';
// import Connector from 'views/Connector';

const Connections: FunctionComponent<Props> = ({
  useAccounts = useAccountsDefault,
}) => {
  const { isLoadingAccounts, isLoadingInitializationToken } = useAccounts();

  if (isLoadingAccounts || isLoadingInitializationToken)
    return <LoadingIndicator />;

  return (
    <>
      <Link to="/">home</Link>
      <h1>Connections</h1>
      {/* <Connector initializationToken={initializationToken || ''} /> */}
    </>
  );
};

interface Props {
  useAccounts?: IUseAccounts;
}

/*
interface Connection {
  id: string;
  institution: {
    name: string;
  };
}
 */

export default Connections;
