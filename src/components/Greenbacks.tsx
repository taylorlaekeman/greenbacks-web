import React, { FunctionComponent } from 'react';

import { queries, useQuery } from 'api';
import Connector from 'components/Connector';
import LoadingIndicator from 'components/LoadingIndicator';

const Greenbacks: FunctionComponent = () => {
  const { data: tokenResponse } = useQuery(
    queries.getConnectionInitializationToken,
    {
      fetchPolicy: 'network-only',
    }
  );

  const initializationToken = tokenResponse?.getConnectionInitializationToken;

  if (!initializationToken) return <LoadingIndicator />;
  return <Connector initializationToken={initializationToken} />;
};

export default Greenbacks;
