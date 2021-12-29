import React from 'react';
import { render, screen } from '@testing-library/react';

import Connections from 'components/Connections';
import Router from 'routing';
import AccountConnectorStub from 'test/stubs/AccountConnector';
import UseAccountsStub from 'test/stubs/useAccounts';
import getAccount from 'test/utils/getAccount';

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

  test.each([
    ['id', 'foo'],
    ['id', 'bar'],
    ['foo', 'name'],
    ['bar', 'name'],
  ])('lists account with id %s and name %s', (id, name) => {
    const stub = new UseAccountsStub({
      accounts: [getAccount({ id, institution: name })],
    });
    render(
      <Router>
        <Connections useAccounts={stub.useAccounts} />
      </Router>
    );
    const element = screen.getByText(`${name} (${id})`);
    expect(element).toBeVisible();
  });

  test('shows no accounts text when no accounts are connected', () => {
    render(
      <Router>
        <Connections useAccounts={new UseAccountsStub().useAccounts} />
      </Router>
    );
    const element = screen.getByText("You haven't connected any accounts yet");
    expect(element).toBeVisible();
  });

  test('does not show no accounts text when accounts are connected', () => {
    render(
      <Router>
        <Connections
          useAccounts={
            new UseAccountsStub({ accounts: [getAccount()] }).useAccounts
          }
        />
      </Router>
    );
    const element = screen.queryByText(
      "You haven't connected any accounts yet"
    );
    expect(element).toBeNull();
  });

  test.each(['foo', 'bar'])('passes token %s to account connector', (value) => {
    render(
      <Router>
        <Connections
          AccountConnector={AccountConnectorStub}
          useAccounts={
            new UseAccountsStub({
              initializationToken: value,
            }).useAccounts
          }
        />
      </Router>
    );
    const element = screen.getByTestId('token');
    expect(element).toHaveTextContent(value);
  });
});
