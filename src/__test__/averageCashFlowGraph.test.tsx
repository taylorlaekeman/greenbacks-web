import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category } from 'types/transaction';

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
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2021-01-01">
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

test('excludes hidden transactions', async () => {
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
          amount: 1200,
          datetime: '2020-01-01',
          name: 'hidden',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 1200,
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
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graphDataContainer = await screen.findByTestId(
    'average-cash-flow-graph'
  );
  expect(graphDataContainer).toHaveAttribute('data-earning', '100');
  expect(graphDataContainer).toHaveAttribute('data-saving', '100');
  expect(graphDataContainer).toHaveAttribute('data-spending', '100');
});

test('does not show graph while transactions are loading', () => {
  render(
    <TestGreenbacksProvider>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    screen.queryByTestId('average-cash-flow-graph')
  ).not.toBeInTheDocument();
});
