import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import wait from 'utils/wait';

test('shows loading indicator while transactions are loading', () => {
  render(
    <TestGreenbacksProvider route="/expenses/2020-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-expenses-list'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows names and amounts from transactions', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: 499, name: 'coffee' }),
        buildTransaction({ amount: 999, name: 'bakery' }),
        buildTransaction({ amount: 1699, name: 'netflix' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/expenses/2020-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  screen.getByText('coffee $4.99');
  screen.getByText('bakery $9.99');
  screen.getByText('netflix $16.99');
});

test('excludes earnings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: 100, name: 'coffee' }),
        buildTransaction({ amount: -100, name: 'bakery' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/expenses/2020-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  const text = screen.queryByText('bakery');
  expect(text).not.toBeInTheDocument();
});

test.each(['/'])('does not render list at route %s', async (value) => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction({ amount: 100, name: 'coffee' })],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route={value}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  const list = screen.queryByTestId('monthly-expenses-list');
  expect(list).not.toBeInTheDocument();
});
