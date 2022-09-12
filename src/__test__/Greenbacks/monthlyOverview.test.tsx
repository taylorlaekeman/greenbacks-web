import React from 'react';
import { render, screen, within } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import Category from 'types/category';
import Transaction from 'types/unfilteredTransaction';

test('shows total earning', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -100,
        }),
        buildTransaction({
          amount: -100,
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findByText } = within(
    await screen.findByTestId('section-monthly-overview')
  );
  expect(await findByText('Total Earning: $2.00')).toBeVisible();
});

test('shows total spending', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
        }),
        buildTransaction({
          amount: 100,
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findByText } = within(
    await screen.findByTestId('section-monthly-overview')
  );
  expect(await findByText('Total Spending: $2.00')).toBeVisible();
});

test('shows total saving', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Saving,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'test name',
          property: 'name' as keyof Transaction,
        },
      ],
    },
  ];
  render(
    <TestGreenbacksProvider
      filters={filters}
      mocks={apiMocks}
      route="/months/2020-01/"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findByText } = within(
    await screen.findByTestId('section-monthly-overview')
  );
  expect(await findByText('Total Saving: $1.00')).toBeVisible();
});

test('shows savings rate', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -200,
        }),
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Saving,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'test name',
          property: 'name' as keyof Transaction,
        },
      ],
    },
  ];
  render(
    <TestGreenbacksProvider
      filters={filters}
      mocks={apiMocks}
      route="/months/2020-01/"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findByText } = within(
    await screen.findByTestId('section-monthly-overview')
  );
  expect(await findByText('Savings Rate: 50%')).toBeVisible();
});

test('shows loading indicator while transactions are loading', async () => {
  render(
    <TestGreenbacksProvider route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    screen.getByTestId('loading-indicator-monthly-overview')
  ).toBeVisible();
});
