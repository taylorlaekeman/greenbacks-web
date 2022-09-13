import React from 'react';
import { render, screen, within } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import { Comparator } from 'types/filter';
import { Category, CoreTransaction } from 'types/transaction';

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
  const { getByText } = within(
    await screen.findByTestId('section-monthly-expenses')
  );
  expect(getByText(/first merchant/)).toBeInTheDocument();
  expect(getByText(/first name/)).toBeInTheDocument();
  expect(getByText(/\$1.00/)).toBeInTheDocument();
  expect(getByText(/2020-01-01/)).toBeInTheDocument();
  expect(getByText(/second merchant/)).toBeInTheDocument();
  expect(getByText(/second name/)).toBeInTheDocument();
  expect(getByText(/\$2.00/)).toBeInTheDocument();
  expect(getByText(/2020-01-15/)).toBeInTheDocument();
});

test('excludes savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
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
    <TestGreenbacksProvider filters={filters} mocks={mocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { queryByText } = within(
    await screen.findByTestId('section-monthly-expenses')
  );
  expect(queryByText(/SAVINGS!/)).not.toBeInTheDocument();
});

test('shows current month when no month is present in route', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction()],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(await screen.findByText(/January 2020/)).toBeInTheDocument();
});

test('shows month from url', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction()],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2020-02-01"
      route="/months/2020-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(await screen.findByText(/January 2020/)).toBeInTheDocument();
});

test('shows spending category for matched transaction', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction({ name: 'test-name' })],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id',
      matchers: [
        {
          expectedValue: 'test-name',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'test-tag',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={mocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findByText } = within(
    await screen.findByTestId('section-monthly-expenses')
  );
  expect(await findByText(/Spending/)).toBeVisible();
});

test('shows spending category for uncategorized transaction', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction({ name: 'test-name' })],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findByText } = within(
    await screen.findByTestId('section-monthly-expenses')
  );
  expect(await findByText(/Spending/)).toBeVisible();
});

test('shows tag if present', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction({ name: 'test-name' })],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id',
      matchers: [
        {
          expectedValue: 'test-name',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'Food',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={mocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(await screen.findByText(/Food$/)).toBeVisible();
});

test('shows tag from id filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction({ id: 'test-id' })],
    }),
  ];
  const idFilters = [
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id',
      matchers: [
        {
          expectedValue: 'test-id',
          property: 'id' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'test tag',
    },
  ];
  render(
    <TestGreenbacksProvider
      idFilters={idFilters}
      mocks={apiMocks}
      now="2020-01-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByText } = within(
    await screen.findByTestId('section-monthly-expenses')
  );
  expect(getByText(/test tag/)).toBeVisible();
});

test('shows tag from filter with greater than comparator', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction({ amount: 101 })],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id',
      matchers: [
        {
          comparator: Comparator.GreaterThan,
          expectedValue: '100',
          property: 'amount' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'test tag',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByText } = within(
    await screen.findByTestId('section-monthly-expenses')
  );
  expect(getByText(/test tag/)).toBeVisible();
});

test('shows tag from filter with less than comparator', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction({ amount: 99 })],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id',
      matchers: [
        {
          comparator: Comparator.LessThan,
          expectedValue: '100',
          property: 'amount' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'test tag',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByText } = within(
    await screen.findByTestId('section-monthly-expenses')
  );
  expect(getByText(/test tag/)).toBeVisible();
});

test('shows tag from filter multiple matchers', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: 101, name: 'test name' }),
        buildTransaction({ amount: 99, name: 'test name' }),
      ],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id',
      matchers: [
        {
          comparator: Comparator.GreaterThan,
          expectedValue: '100',
          property: 'amount' as keyof CoreTransaction,
        },
        {
          comparator: Comparator.Equals,
          expectedValue: 'test name',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'test tag',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByText } = within(
    await screen.findByTestId('section-monthly-expenses')
  );
  expect(getByText(/test tag/)).toBeVisible(); // only found once, second transaction does not have tag
});
