import React from 'react';
import { render, screen, within } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import Category from 'types/category';
import Transaction from 'types/unfilteredTransaction';

test('shows loading indicator while transactions are loading', () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-transactions-by-tag'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('groups transactions by tag', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'first name',
        }),
        buildTransaction({
          amount: 100,
          name: 'first name',
        }),
        buildTransaction({
          amount: 100,
          name: 'second name',
        }),
        buildTransaction({
          amount: 100,
          name: 'second name',
        }),
        buildTransaction({
          amount: 100,
          name: 'second name',
        }),
        buildTransaction({
          amount: 100,
          name: 'third name',
        }),
      ],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'first name',
          property: 'name' as keyof Transaction,
        },
      ],
      tagToAssign: 'first tag',
    },
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'second name',
          property: 'name' as keyof Transaction,
        },
      ],
      tagToAssign: 'second tag',
    },
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'third name',
          property: 'name' as keyof Transaction,
        },
      ],
      tagToAssign: 'third tag',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getAllByRole } = within(
    await screen.findByTestId('section-transactions-by-tag')
  );
  const items = getAllByRole('listitem');
  expect(items[0]).toHaveTextContent(/second tag: \$3.00/);
  expect(items[1]).toHaveTextContent(/first tag: \$2.00/);
  expect(items[2]).toHaveTextContent(/third tag: \$1.00/);
});

test('groups untagged transactions', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'first name',
        }),
        buildTransaction({
          amount: 100,
          name: 'second name',
        }),
      ],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'first name',
          property: 'name' as keyof Transaction,
        },
      ],
    },
    {
      categoryToAssign: Category.Spending,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'second name',
          property: 'name' as keyof Transaction,
        },
      ],
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByText } = within(
    await screen.findByTestId('section-transactions-by-tag')
  );
  expect(getByText(/Untagged: \$2.00/)).toBeVisible();
});

test('shows current month when no month is present in route', async () => {
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
      categoryToAssign: Category.Spending,
      id: 'test-filter-id',
      matchers: [
        {
          expectedValue: 'test name',
          property: 'name' as keyof Transaction,
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
  const container = await screen.findByTestId('section-transactions-by-tag');
  expect(within(container).getByText(/test tag/)).toBeVisible();
});
