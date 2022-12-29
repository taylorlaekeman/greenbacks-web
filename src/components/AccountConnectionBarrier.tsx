import React, { FC } from 'react';

import Link from 'components/Link';
import useReauthenticationRequired from 'hooks/useReauthenticationRequired';

const AccountConnectionBarrier: FC = ({ children }) => {
  const { isReauthenticationRequired } = useReauthenticationRequired();

  if (isReauthenticationRequired)
    return (
      <>
        <p>At least one of your accounts needs reauthentication</p>
        <Link href="accounts">Accounts</Link>
      </>
    );

  return <>{children}</>;
};

export default AccountConnectionBarrier;
