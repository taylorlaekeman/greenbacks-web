import React, { createContext, FC, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

import noop from 'utils/noop';

interface AccountConnectionContext {
  update?: Update;
}

export const AccountConnectionContext = createContext<AccountConnectionContext>(
  {},
);

const AccountConnectionProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | undefined>();
  const [onSuccess, setOnSuccess] = useState<OnSuccess>(() => noop);
  const { open, ready } = usePlaidLink({ token: token || null, onSuccess });
  const update: Update = ({
    onSuccess: onSuccessToSave = noop,
    token: tokenToSave,
  }) => {
    setToken(tokenToSave);
    setOnSuccess(() => onSuccessToSave);
  };
  useEffect(() => {
    if (open && ready && token) open();
  }, [open, ready, token]);
  return (
    <AccountConnectionContext.Provider value={{ update }}>
      {children}
    </AccountConnectionContext.Provider>
  );
};

type Update = (input: { onSuccess?: OnSuccess; token: string }) => void;

type OnSuccess = () => void;

export const TestAccountConnectionProvider: FC<TestProps> = ({
  children,
  onUpdateAccountConnection,
}) => (
  <AccountConnectionContext.Provider
    value={{
      update: ({ token }) => {
        onUpdateAccountConnection?.({ token });
      },
    }}
  >
    {children}
  </AccountConnectionContext.Provider>
);

interface TestProps {
  onUpdateAccountConnection?: (input: { token: string }) => void;
}

export default AccountConnectionProvider;
