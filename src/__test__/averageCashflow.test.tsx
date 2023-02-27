import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import { Category, CoreTransaction } from 'types/transaction';

test('shows graph with spending, saving, and earning amounts', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 480,
          datetime: '2020-01-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 720,
          datetime: '2020-01-01',
          name: 'spending',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Earning,
      matchers: [buildMatcher({ expectedValue: 'earning', property: 'name' })],
    }),
    buildFilter({
      categoryToAssign: Category.Saving,
      matchers: [buildMatcher({ expectedValue: 'saving', property: 'name' })],
    }),
    buildFilter({
      categoryToAssign: Category.Spending,
      matchers: [buildMatcher({ expectedValue: 'spending', property: 'name' })],
    }),
  ];
  render(
    <TestGreenbacksProvider
      filters={filters}
      mocks={apiMocks}
      now="2021-01-01"
      route="/average-cashflow"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graphDataContainer = await screen.findByTestId(
    'average-cash-flow-graph'
  );
  expect(graphDataContainer).toHaveAttribute('data-earning', '100');
  expect(graphDataContainer).toHaveAttribute('data-saving', '40');
  expect(graphDataContainer).toHaveAttribute('data-spending', '60');
});

test('shows average monthly earnings', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: -200, datetime: '2020-01-01' }),
        buildTransaction({ amount: -200, datetime: '2020-02-01' }),
        buildTransaction({ amount: -200, datetime: '2020-03-01' }),
        buildTransaction({ amount: -400, datetime: '2020-04-01' }),
        buildTransaction({ amount: -400, datetime: '2020-05-01' }),
        buildTransaction({ amount: -400, datetime: '2020-06-01' }),
        buildTransaction({
          amount: -400,
          datetime: '2020-06-01',
          name: 'hidden',
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
      mocks={apiMocks}
      now="2021-01-01"
      route="/average-cashflow"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('You earn $1.50 per month on average')
  ).toBeVisible();
});

test('shows average monthly savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 200,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-02-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-03-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-04-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-05-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-06-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: -400,
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
    buildFilter({
      categoryToAssign: Category.Hidden,
      matchers: [buildMatcher({ expectedValue: 'hidden', property: 'name' })],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={mocks}
      now="2021-01-01"
      filters={filters}
      route="/average-cashflow"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('You save $1.50 per month on average')
  ).toBeVisible();
});

test('shows average monthly spending', async () => {
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
      now="2021-01-01"
      route="/average-cashflow"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('You spend $1.50 per month on average')
  ).toBeVisible();
});
