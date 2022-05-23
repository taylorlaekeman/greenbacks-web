import { useContext, useEffect } from 'react';

import { AccountConnectionContext } from 'context/AccountConnection';
import useUpdateToken from 'hooks/useUpdateToken';

const useUpdateAccountConnection = (): {
  update?: (input: { accountId: string }) => void;
} => {
  const { update } = useContext(AccountConnectionContext);
  const { fetchUpdateToken, updateToken } = useUpdateToken();
  useEffect(() => {
    if (update && updateToken) update({ token: updateToken });
  }, [update, updateToken]);
  return { update: fetchUpdateToken };
};

export default useUpdateAccountConnection;
