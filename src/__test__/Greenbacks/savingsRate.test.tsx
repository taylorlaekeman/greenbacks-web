import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category, CoreTransaction } from 'types/transaction';
import wait from 'utils/wait';

test('shows loading indicator while transactions are loading', () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-average-savings-rate'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows dash without any transactions', async () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-savings-rate');
  expect(text).toHaveTextContent('-');
});

test('correctly calculates savings rate', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -100, datetime: '2020-01-01' }),
        buildTransaction({
          amount: 50,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -100, datetime: '2020-02-01' }),
        buildTransaction({
          amount: 50,
          datetime: '2020-02-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -100, datetime: '2020-03-01' }),
        buildTransaction({
          amount: 50,
          datetime: '2020-03-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -200, datetime: '2020-04-01' }),
        buildTransaction({
          amount: 100,
          datetime: '2020-04-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -200, datetime: '2020-05-01' }),
        buildTransaction({
          amount: 100,
          datetime: '2020-05-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -200, datetime: '2020-06-01' }),
        buildTransaction({
          amount: 100,
          datetime: '2020-06-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Saving,
      id: 'test-filter-id',
      matchers: [
        {
          expectedValue: 'SAVINGS!',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'retirement',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-savings-rate');
  expect(text).toHaveTextContent('50%');
});

test('shows label text', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [buildTransaction({ amount: 600, datetime: '2020-01-01' })],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  expect(screen.getByText(/Savings rate/)).toBeInTheDocument();
});
