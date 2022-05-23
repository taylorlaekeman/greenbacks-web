import React, { createContext, FC } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import noop from 'utils/noop';

interface AuthContext {
  logout: () => void;
}

export const AuthContext = createContext<AuthContext>({
  logout: noop,
});

const AuthProvider: FC = ({ children }) => (
  <Auth0Provider
    audience="https://greenbacks"
    clientId="KO3di6CbUea9Cy6kafI5prCOsNPdZuEk"
    domain="dev-ql06dx5h.us.auth0.com"
    redirectUri={window.location.origin}
  >
    <InnerProvider>{children}</InnerProvider>
  </Auth0Provider>
);

const InnerProvider: FC = ({ children }) => {
  const { logout } = useAuth0();
  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};

export const TestAuthProvider: FC<TestProps> = ({
  children,
  logout = jest.fn(),
}) => (
  <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
);

interface TestProps {
  logout?: () => void;
}

export default AuthProvider;
