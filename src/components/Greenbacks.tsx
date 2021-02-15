import React, { FunctionComponent, useCallback, useState } from 'react';

import { mutations, queries, useLazyQuery, useMutation, useQuery } from 'api';
import FinancialAuthorizer from 'components/FinancialAuthorizer';
import noop from 'utils/noop';

const Greenbacks: FunctionComponent<propTypes> = () => {
  const [hasClosed, setHasClosed] = useState(false);
  const [
    getAuthorizerToken,
    { data: tokenResponse, error: tokenError, loading: isLoadingToken },
  ] = useLazyQuery(queries.getAuthorizerToken, { fetchPolicy: 'network-only' });
  const [
    createFinancialAccount,
    { data, error },
  ] = useMutation(mutations.createFinancialAccount, { onError: noop });
  const onAuthorize = useCallback((token: string, metadata: any) => {
    createFinancialAccount({ variables: { token } });
  }, [createFinancialAccount]);

  if (tokenResponse?.getAuthorizerToken && !hasClosed)
    return (
      <FinancialAuthorizer
        onClose={() => setHasClosed(true)}
        onSuccess={onAuthorize}
        token={tokenResponse.getAuthorizerToken}
      />
    );

  return (
    <>
      <button type="button" onClick={() => getAuthorizerToken()}>
        Connect an account
      </button>
    </>
  );
};

type propTypes = {};

export default Greenbacks;
