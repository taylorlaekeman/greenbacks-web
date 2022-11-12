import React from 'react';
import { render, screen, within } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category, CoreTransaction } from 'types/transaction';

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
        buildTransaction({
          amount: -100,
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
      route="/months/2020-01/"
    >
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
        buildTransaction({
          amount: 100,
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
      mocks={apiMocks}
      filters={filters}
      route="/months/2020-01/"
    >
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
        buildTransaction({
          amount: 100,
          name: 'hidden',
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
          expectedValue: 'test name',
          property: 'name' as keyof CoreTransaction,
        },
      ],
    }),
    buildFilter({
      categoryToAssign: Category.Hidden,
      matchers: [buildMatcher({ expectedValue: 'hidden', property: 'name' })],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      filters={filters}
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
        buildTransaction({
          amount: 100,
          name: 'hidden',
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
          expectedValue: 'test name',
          property: 'name',
        },
      ],
    }),
    buildFilter({
      categoryToAssign: Category.Hidden,
      matchers: [buildMatcher({ expectedValue: 'hidden', property: 'name' })],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      filters={filters}
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

test('shows cash flow graph', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 101,
          name: 'earning',
        }),
        buildTransaction({
          amount: 102,
          name: 'saving',
        }),
        buildTransaction({
          amount: 103,
          name: 'spending',
        }),
        buildTransaction({
          amount: 104,
          name: 'hidden',
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
      categoryToAssign: Category.Hidden,
      matchers: [buildMatcher({ expectedValue: 'hidden', property: 'name' })],
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
      mocks={apiMocks}
      filters={filters}
      route="/months/2020-01/"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graphDataContainer = await screen.findByTestId(
    'monthly-cash-flow-graph'
  );
  expect(graphDataContainer).toHaveAttribute('data-earning', '101');
  expect(graphDataContainer).toHaveAttribute('data-saving', '102');
  expect(graphDataContainer).toHaveAttribute('data-spending', '103');
});
