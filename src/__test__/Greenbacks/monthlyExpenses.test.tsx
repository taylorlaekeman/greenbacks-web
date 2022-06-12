import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import wait from 'utils/wait';

test('shows loading indicator while expenses are loading', () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-monthly-expenses'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows expenses', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          merchant: 'first merchant',
          name: 'first name',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-01-15',
          merchant: 'second merchant',
          name: 'second name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  expect(screen.getByText(/first merchant/)).toBeInTheDocument();
  expect(screen.getByText(/first name/)).toBeInTheDocument();
  expect(screen.getByText(/\$1.00/)).toBeInTheDocument();
  expect(screen.getByText(/2020-01-01/)).toBeInTheDocument();
  expect(screen.getByText(/second merchant/)).toBeInTheDocument();
  expect(screen.getByText(/second name/)).toBeInTheDocument();
  expect(screen.getByText(/\$2.00/)).toBeInTheDocument();
  expect(screen.getByText(/2020-01-15/)).toBeInTheDocument();
});

test('exludes savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          name: 'EFT Withdrawal to CDN SHR INVEST',
        }),
        buildTransaction({
          name: 'EFT Withdrawal to WSII',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  expect(
    screen.queryByText(/EFT Withdrawal to CDN SHR INVEST/)
  ).not.toBeInTheDocument();
  expect(screen.queryByText(/EFT Withdrawal to WSII/)).not.toBeInTheDocument();
});
