import React from 'react';
import { render } from '@testing-library/react';

import UseAccountsStub from 'test/stubs/useAccounts';
import Connections from 'views/Connections';

describe('connections', () => {
  describe('use accounts', () => {
    test('calls use accounts', () => {
      const stub = new UseAccountsStub();
      render(<Connections useAccounts={stub.useAccounts} />);
      expect(stub.useAccountsCalls).toHaveLength(1);
    });
  });
});
