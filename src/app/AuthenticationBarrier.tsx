import React, { FunctionComponent, ReactNode } from 'react';

import { useAuth } from 'auth';

const AuthenticationBarrier: FunctionComponent<propTypes> = ({
  children,
  LoginComponent,
}: propTypes) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginComponent />;

  return <>{children}</>;
};

interface propTypes {
  children: ReactNode;
  LoginComponent: FunctionComponent;
}

export default AuthenticationBarrier;
