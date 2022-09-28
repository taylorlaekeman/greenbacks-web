import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildOneTransactionFilter, {
  buildMatcher,
} from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import buildTwoTransactionFilter from '__test__/utils/buildTwoTransactionFilter';
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
    'loading-indicator-average-monthly-expenses'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows zero without any expenses', async () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-monthly-expenses');
  expect(text).toHaveTextContent('$0.00');
});

test('correctly averages transactions', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: 100, datetime: '2020-01-01' }),
        buildTransaction({ amount: 100, datetime: '2020-02-01' }),
        buildTransaction({ amount: 100, datetime: '2020-03-01' }),
        buildTransaction({ amount: 200, datetime: '2020-04-01' }),
        buildTransaction({ amount: 200, datetime: '2020-05-01' }),
        buildTransaction({ amount: 200, datetime: '2020-06-01' }),
        buildTransaction({
          amount: 200,
          datetime: '2020-06-01',
          name: 'hidden',
        }),
      ],
    }),
  ];
  const filters = [
    buildOneTransactionFilter({
      categoryToAssign: Category.Hidden,
      matchers: [buildMatcher({ expectedValue: 'hidden', property: 'name' })],
    }),
  ];
  render(
    <TestGreenbacksProvider
      oneTransactionFilters={filters}
      mocks={mocks}
      now="2020-07-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-monthly-expenses');
  expect(text).toHaveTextContent('$1.50');
});

test('handles months without expenses', async () => {
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
  const text = screen.getByTestId('average-monthly-expenses');
  expect(text).toHaveTextContent('$1.00');
});

test('excludes earnings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -600, datetime: '2020-01-01' }),
        buildTransaction({ amount: 600, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-monthly-expenses');
  expect(text).toHaveTextContent('$1.00');
});

test('excludes savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: 600, datetime: '2020-01-01' }),
        buildTransaction({
          amount: 600,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    buildOneTransactionFilter({
      categoryToAssign: Category.Saving,
      id: 'test-filter-id',
      matchers: [
        {
          expectedValue: 'SAVINGS!',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'retirement',
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={mocks}
      now="2020-07-01"
      oneTransactionFilters={filters}
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-monthly-expenses');
  expect(text).toHaveTextContent('$1.00');
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
  const label = screen.getByTestId('average-monthly-expenses-label');
  expect(label).toHaveTextContent(/^Average monthly spending/);
});

test('excludes transfers', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-06-30',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -600,
          datetime: '2020-01-01',
          name: 'transfer received',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-01-01',
          name: 'transfer sent',
        }),
        buildTransaction({
          amount: -600,
          datetime: '2020-02-01',
          name: 'transfer received',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-02-01',
          name: 'transfer sent',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-03-01',
          name: 'transfer sent',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-03-01',
          name: 'other!',
        }),
      ],
    }),
  ];
  const filters = [
    buildTwoTransactionFilter({
      categoryToAssign: Category.Spending,
      firstMatchers: [
        {
          expectedValue: 'transfer received',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      id: 'test',
      secondMatchers: [
        {
          expectedValue: 'transfer sent',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'test-tag',
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2020-07-01"
      twoTransactionFilters={filters}
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByTestId('average-monthly-expenses')
  ).toHaveTextContent('$1.00');
});
