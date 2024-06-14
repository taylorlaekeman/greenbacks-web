import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import { ACCOUNTS_QUERY } from 'hooks/useAccounts';
import { UPDATE_TOKEN_QUERY } from 'hooks/useUpdateToken';
import wait from 'utils/wait';

const getAccount = ({
  createdDate = '2020-01-01 00:00:00',
  id = 'testId',
  institution: { name = 'test institution name' } = {},
  isReauthenticationRequired = false,
  modifiedDate = '2020-01-01 00:00:00',
}) => ({
  createdDate,
  id,
  modifiedDate,
  institution: { name },
  isReauthenticationRequired,
});

test('shows loading indicator while transactions are loading', () => {
  const mocks = [
    {
      request: {
        query: ACCOUNTS_QUERY,
      },
      result: {
        data: {
          accounts: [],
        },
      },
    },
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/accounts">
      <Greenbacks />
    </TestGreenbacksProvider>,
  );
  const loadingIndicator = screen.getByTestId('loading-indicator-accounts');
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows account correctly', async () => {
  const mocks = [
    {
      request: {
        query: ACCOUNTS_QUERY,
      },
      result: {
        data: {
          accounts: [
            getAccount({ institution: { name: 'test institution name' } }),
          ],
        },
      },
    },
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/accounts">
      <Greenbacks />
    </TestGreenbacksProvider>,
  );
  await act(wait);
  expect(screen.getByText('test institution name')).toBeInTheDocument();
});

test('has reauthenticate button if reauthentication is required', async () => {
  const mocks = [
    {
      request: {
        query: ACCOUNTS_QUERY,
      },
      result: {
        data: {
          accounts: [
            getAccount({
              id: 'testFirstId',
              isReauthenticationRequired: false,
            }),
            getAccount({
              id: 'testSecondId',
              isReauthenticationRequired: true,
            }),
          ],
        },
      },
    },
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/accounts">
      <Greenbacks />
    </TestGreenbacksProvider>,
  );
  await act(wait);
  const wrapper = screen.getByTestId('account-wrapper-testSecondId');
  const button = screen.getByRole('button', { name: 'Reauthenticate' });
  expect(wrapper).toContainElement(button);
});

test('reauthenticate button loads plaid update flow', async () => {
  const updatedAccounts: { token: string }[] = [];
  const mocks = [
    {
      request: {
        query: ACCOUNTS_QUERY,
      },
      result: {
        data: {
          accounts: [
            getAccount({
              id: 'test id',
              isReauthenticationRequired: true,
            }),
          ],
        },
      },
    },
    {
      request: {
        query: UPDATE_TOKEN_QUERY,
        variables: { accountId: 'test id' },
      },
      result: {
        data: {
          updateToken: 'test token',
        },
      },
    },
  ];
  render(
    <TestGreenbacksProvider
      mocks={mocks}
      onUpdateAccountConnection={({ token }) => {
        updatedAccounts.push({ token });
      }}
      route="/accounts"
    >
      <Greenbacks />
    </TestGreenbacksProvider>,
  );
  await act(wait);
  const button = screen.getByRole('button', { name: 'Reauthenticate' });
  userEvent.click(button);
  await act(wait);
  expect(updatedAccounts).toHaveLength(1);
  expect(updatedAccounts[0].token).toBe('test token');
});
