import { useContext } from 'react';

import { AuthContext } from 'context/Auth';

const useLogout = (): { logout: () => void } => {
  const { logout } = useContext(AuthContext);
  return { logout };
};

export default useLogout;
