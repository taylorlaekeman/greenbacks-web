import React from 'react';
import { render, screen, within } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import Category from 'types/category';
import Transaction from 'types/unfilteredTransaction';

test('shows untagged transactions', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          id: 'first-id',
          merchant: 'first merchant',
          name: 'first name',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-01-02',
          id: 'second-id',
          merchant: 'second merchant',
          name: 'second name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getAllByRole } = within(
    await screen.findByTestId('section-untagged-transactions')
  );
  const items = getAllByRole('listitem');
  expect(items[0]).toHaveTextContent(
    '$2.00—second merchant (second name)—2020-01-02 second-id'
  );
  expect(items[1]).toHaveTextContent(
    '$1.00—first merchant (first name)—2020-01-01 first-id'
  );
});

test('section is not present while transactions are loading', async () => {
  render(
    <TestGreenbacksProvider>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    screen.queryByTestId('section-untagged-transactions')
  ).not.toBeInTheDocument();
});

test('section is not present when no untagged transactions exist', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          name: 'test name',
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
          expectedValue: 'test name',
          property: 'name' as keyof Transaction,
        },
      ],
      tagToAssign: 'test tag',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={apiMocks}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await screen.findByText(/test name/); // ensure transactions have loaded
  expect(
    screen.queryByTestId('section-untagged-transactions')
  ).not.toBeInTheDocument();
});

test('uses current month when no month is specified in the route', async () => {
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
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    screen.queryByTestId('section-untagged-transactions')
  ).not.toBeInTheDocument();
});
