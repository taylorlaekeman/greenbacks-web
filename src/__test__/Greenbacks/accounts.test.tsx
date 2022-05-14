import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import { ACCOUNTS_QUERY } from 'hooks/useAccounts';
import wait from 'utils/wait';

const getAccount = ({
  createdDate = '2020-01-01 00:00:00',
  id = 'testId',
  modifiedDate = '2020-01-01 00:00:00',
  institution: { name = 'test institution name' } = {},
  isReauthenticationRequired = false,
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
    </TestGreenbacksProvider>
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
    </TestGreenbacksProvider>
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
    </TestGreenbacksProvider>
  );
  await act(wait);
  const wrapper = screen.getByTestId('account-wrapper-testSecondId');
  const button = screen.getByRole('button', { name: 'Reauthenticate' });
  expect(wrapper).toContainElement(button);
});
