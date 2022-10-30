import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category } from 'types/transaction';

test('displays loading indicator while transactions are loading', () => {
  const apiMocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2021-01-01">
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
    <TestGreenbacksProvider mocks={apiMocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$0.00');
});

test('correctly averages transactions', async () => {
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
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.50');
});

test('handles months without earnings', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: -1200, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.00');
});

test('excludes expenses', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          accountId: '1',
          amount: -1200,
          datetime: '2020-01-01',
        }),
        buildTransaction({
          accountId: '1',
          amount: 1200,
          datetime: '2020-01-01',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.00');
});

test('shows label text', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: -1200, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const label = await screen.findByTestId('average-monthly-earnings-label');
  expect(label).toHaveTextContent(/^Average monthly earning$/);
});
