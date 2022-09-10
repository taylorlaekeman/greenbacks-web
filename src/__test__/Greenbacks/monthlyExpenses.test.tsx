import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import Category from 'types/category';
import Transaction from 'types/unfilteredTransaction';
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
          property: 'name' as keyof Transaction,
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
  await act(wait);
  expect(screen.queryByText(/SAVINGS!/)).not.toBeInTheDocument();
});

test('shows current month by default', async () => {
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

test('moves to previous month', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction()],
    }),
    buildApiTransactionsMock({
      endDate: '2019-12-31',
      startDate: '2019-12-01',
      transactions: [buildTransaction({ amount: 1337 })],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const button = await screen.findByRole('link', {
    name: 'Go to previous month',
  });
  userEvent.click(button);
  await act(wait);
  expect(await screen.findByText(/December 2019/)).toBeVisible();
  const { getByText } = within(screen.getByTestId('section-monthly-expenses'));
  expect(getByText(/\$13.37/)).toBeInTheDocument();
});

test('moves to next month', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [buildTransaction()],
    }),
    buildApiTransactionsMock({
      endDate: '2020-02-29',
      startDate: '2020-02-01',
      transactions: [buildTransaction({ amount: 1337 })],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const button = await screen.findByRole('link', {
    name: 'Go to next month',
  });
  userEvent.click(button);
  await act(wait);
  expect(await screen.findByText(/February 2020/)).toBeVisible();
  const { getByText } = within(screen.getByTestId('section-monthly-expenses'));
  expect(getByText(/\$13.37/)).toBeInTheDocument();
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
          property: 'name' as keyof Transaction,
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
  expect(await screen.findByText(/Spending/)).toBeVisible();
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
  expect(await screen.findByText(/Spending/)).toBeVisible();
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
          property: 'name' as keyof Transaction,
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
