import { useContext } from 'react';

import { AuthContext } from 'context/Auth';

const useLogin = (): { login: () => void } => {
  const { login } = useContext(AuthContext);
  return {
    login,
  };
};

export default useLogin;
