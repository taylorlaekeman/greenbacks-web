import React from 'react';
import { render, screen } from '@testing-library/react';

import Connections from 'components/Connections';
import Router from 'routing';
import UseAccountsStub from 'test/stubs/useAccounts';

describe('connections', () => {
  test('calls use accounts', () => {
    const stub = new UseAccountsStub();
    render(
      <Router>
        <Connections useAccounts={stub.useAccounts} />
      </Router>
    );
    expect(stub.useAccountsCalls).toHaveLength(1);
  });

  test.each(['isLoadingAccounts', 'isLoadingInitializationToken'])(
    'renders loading indicator when %s is true',
    (key) => {
      const stub = new UseAccountsStub({ [key]: true });
      render(
        <Router>
          <Connections useAccounts={stub.useAccounts} />
        </Router>
      );
      const element = screen.getByRole('status', { name: 'loading' });
      expect(element).toBeVisible();
    }
  );

  test('does not render loading indicator when not loading', () => {
    render(
      <Router>
        <Connections useAccounts={new UseAccountsStub().useAccounts} />
      </Router>
    );
    const element = screen.queryByRole('status', { name: 'loading' });
    expect(element).toBeNull();
  });
});
