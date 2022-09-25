import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter from '__test__/utils/buildFilter';
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
    'loading-indicator-average-monthly-savings'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows zero without any savings', async () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-monthly-savings');
  expect(text).toHaveTextContent('$0.00');
});

test('correctly averages savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-02-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-03-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-04-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-05-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-06-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
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
  const text = screen.getByTestId('average-monthly-savings');
  expect(text).toHaveTextContent('$1.50');
});

test('handles months without savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({
          amount: 600,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      id: 'test-filter-id-1',
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
  const text = screen.getByTestId('average-monthly-savings');
  expect(text).toHaveTextContent('$1.00');
});

test('excludes earnings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -600, datetime: '2020-01-01' }),
        buildTransaction({
          amount: 600,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      id: 'test-filter-id-1',
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
  const text = screen.getByTestId('average-monthly-savings');
  expect(text).toHaveTextContent('$1.00');
});

test('excludes expenses', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: 600, datetime: '2020-01-01' }),
        buildTransaction({
          amount: 600,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      id: 'test-filter-id-1',
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
  const text = screen.getByTestId('average-monthly-savings');
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
  const label = screen.getByTestId('average-monthly-savings-label');
  expect(label).toHaveTextContent(/^Average monthly saving/);
});
