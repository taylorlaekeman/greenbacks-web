import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category, CoreTransaction } from 'types/transaction';

test('displays loading indicator while transactions are loading', () => {
  const apiMocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-average-monthly-earnings'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows zero without any earnings', async () => {
  const apiMocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$0.00');
});

test('correctly averages transactions', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -100, datetime: '2020-01-01' }),
        buildTransaction({ amount: -100, datetime: '2020-02-01' }),
        buildTransaction({ amount: -100, datetime: '2020-03-01' }),
        buildTransaction({ amount: -200, datetime: '2020-04-01' }),
        buildTransaction({ amount: -200, datetime: '2020-05-01' }),
        buildTransaction({ amount: -200, datetime: '2020-06-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.50');
});

test('handles months without earnings', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -600, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.00');
});

test('excludes expenses', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({
          accountId: '1',
          amount: -600,
          datetime: '2020-01-01',
        }),
        buildTransaction({
          accountId: '1',
          amount: 600,
          datetime: '2020-01-01',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.00');
});

test('shows label text', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -600, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const label = await screen.findByTestId('average-monthly-earnings-label');
  expect(label).toHaveTextContent(/^Average monthly earning$/);
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
      ],
    }),
  ];
  const filters = {
    twoTransactionFilters: [
      {
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
      },
    ],
  };
  render(
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByTestId('average-monthly-earnings')
  ).toHaveTextContent('$0.00');
});
