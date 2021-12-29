import React, { FC } from 'react';

import type { Props as AccountConnectorProps } from 'components/AccountConnector';

const AccountConnectorStub: FC<AccountConnectorProps> = ({ token }) => (
  <p data-testid="token">{token}</p>
);

export default AccountConnectorStub;
