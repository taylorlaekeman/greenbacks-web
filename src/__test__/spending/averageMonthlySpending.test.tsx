import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category, CoreTransaction } from 'types/transaction';

test('shows loading indicator while transactions are loading', () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/spending" now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-average-monthly-spending'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows zero without any expenses', async () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/spending" now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('You spend $0.00 per month on average')
  ).toBeVisible();
});

test('correctly averages transactions', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: 200, datetime: '2020-01-01' }),
        buildTransaction({ amount: 200, datetime: '2020-02-01' }),
        buildTransaction({ amount: 200, datetime: '2020-03-01' }),
        buildTransaction({ amount: 400, datetime: '2020-04-01' }),
        buildTransaction({ amount: 400, datetime: '2020-05-01' }),
        buildTransaction({ amount: 400, datetime: '2020-06-01' }),
        buildTransaction({
          amount: 400,
          datetime: '2020-06-01',
          name: 'hidden',
        }),
        buildTransaction({
          amount: -3600,
          datetime: '2020-01-01',
          name: 'earning',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Hidden,
      matchers: [buildMatcher({ expectedValue: 'hidden', property: 'name' })],
    }),
  ];
  render(
    <TestGreenbacksProvider
      filters={filters}
      mocks={mocks}
      route="/spending"
      now="2021-01-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText(
      'You spend $1.50 per month on average (50% of earning)'
    )
  ).toBeVisible();
});

test('handles months without expenses', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: 1200, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/spending" now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('You spend $1.00 per month on average')
  ).toBeVisible();
});

test('excludes savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: 1200, datetime: '2020-01-01' }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
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
      filters={filters}
      mocks={mocks}
      route="/spending"
      now="2021-01-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('You spend $1.00 per month on average')
  ).toBeVisible();
});

test('does not show spending rate when average earnings are 0', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'saving',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Spending,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'saving',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'retirement',
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={mocks}
      route="/spending"
      now="2021-01-01"
      filters={filters}
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('You spend $1.00 per month on average')
  ).toBeVisible();
});
