import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import { ACCOUNTS_QUERY } from 'hooks/useAccounts';
import wait from 'utils/wait';

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
            {
              createdDate: '',
              id: 'testId',
              modifiedDate: '',
              institution: {
                name: 'test institution name',
              },
            },
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
