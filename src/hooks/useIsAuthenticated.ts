import { useContext } from 'react';

import { AuthContext } from 'context/Auth';

const useIsAuthenticated = (): { isAuthenticated: boolean } => {
  const { isAuthenticated } = useContext(AuthContext);
  return {
    isAuthenticated,
  };
};

export default useIsAuthenticated;
