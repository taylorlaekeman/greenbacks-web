import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';

test('shows totals by month', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-02-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 300,
          datetime: '2020-03-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-04-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 500,
          datetime: '2020-05-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-06-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 700,
          datetime: '2020-07-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 800,
          datetime: '2020-08-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 900,
          datetime: '2020-09-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 1000,
          datetime: '2020-10-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 1100,
          datetime: '2020-11-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-12-01',
          name: 'spending',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/spending" now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('loading-indicator-monthly-spending-graph')
  );
  const graph = await screen.findByTestId('monthly-spending-graph');
  expect(graph).toHaveAttribute('data-december-2020', '1200');
  expect(graph).toHaveAttribute('data-november-2020', '1100');
  expect(graph).toHaveAttribute('data-october-2020', '1000');
  expect(graph).toHaveAttribute('data-september-2020', '900');
  expect(graph).toHaveAttribute('data-august-2020', '800');
  expect(graph).toHaveAttribute('data-july-2020', '700');
  expect(graph).toHaveAttribute('data-june-2020', '600');
  expect(graph).toHaveAttribute('data-may-2020', '500');
  expect(graph).toHaveAttribute('data-april-2020', '400');
  expect(graph).toHaveAttribute('data-march-2020', '300');
  expect(graph).toHaveAttribute('data-february-2020', '200');
  expect(graph).toHaveAttribute('data-january-2020', '100');
});

test('shows loading indicator while transactions are loading', async () => {
  render(
    <TestGreenbacksProvider route="/spending">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    screen.getByTestId('loading-indicator-monthly-spending-graph')
  ).toBeVisible();
  expect(
    screen.queryByTestId('monthly-spending-graph')
  ).not.toBeInTheDocument();
});
