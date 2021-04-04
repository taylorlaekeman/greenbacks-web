import React, { FunctionComponent } from 'react';

import { mutations, useMutation } from 'api';
import { useConnectionInitializer } from 'finance';
import noop from 'utils/noop';

const Connector: FunctionComponent<propTypes> = ({
  initializationToken,
}: propTypes) => {
  const [createConnection] = useMutation(mutations.createConnection, {
    onError: noop,
  });
  const { open } = useConnectionInitializer({
    onSuccess: (temporaryToken: string) =>
      createConnection({ variables: { token: temporaryToken } }),
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
