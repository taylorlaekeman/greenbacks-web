import React, { FunctionComponent } from 'react';

// import { mutations, useMutation } from 'api';
// import { useConnectionInitializer } from 'finance';
import { PlaidLink } from 'react-plaid-link';
// import noop from 'utils/noop';

const AccountConnector: FunctionComponent<Props> = ({ onSuccess, token }) => (
  <PlaidLink onSuccess={onSuccess} token={token}>
    Test
  </PlaidLink>
);
/*
  const [createConnection] = useMutation(mutations.createConnection, {
    onError: noop,
  });
  const { open } = useConnectionInitializer({
    onSuccess: (temporaryToken: string) =>
      createConnection({ variables: { token: temporaryToken } }),
    token,
  });

  return (
    <button onClick={() => open()} type="button">
      Connect an account
    </button>
  );
   */

export interface Props {
  onSuccess: (token: string) => void;
  token: string;
}

export default AccountConnector;
