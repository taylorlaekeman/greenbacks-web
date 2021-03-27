import React, { FunctionComponent } from 'react';

import { mutations, useMutation } from 'api';
import { useFinancialAuthorizer } from 'finance';
import noop from 'utils/noop';

const Connector: FunctionComponent<propTypes> = ({
  initializationToken,
}: propTypes) => {
  const [connectAccount] = useMutation(mutations.connectAccount, {
    onError: noop,
  });
  const { open } = useFinancialAuthorizer({
    onSuccess: (temporaryToken: string) =>
      connectAccount({ variables: { token: temporaryToken } }),
    token: initializationToken,
  });

  return (
    <button onClick={() => open()} type="button">
      Connect an account
    </button>
  );
};

interface propTypes {
  initializationToken: string;
}

export default Connector;
