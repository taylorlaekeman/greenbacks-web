import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category } from 'types/transaction';

test('shows totals by month', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -100,
          datetime: '2020-01-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 101,
          datetime: '2020-01-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 102,
          datetime: '2020-01-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -200,
          datetime: '2020-02-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 201,
          datetime: '2020-02-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 202,
          datetime: '2020-02-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -300,
          datetime: '2020-03-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 301,
          datetime: '2020-03-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 302,
          datetime: '2020-03-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -400,
          datetime: '2020-04-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 401,
          datetime: '2020-04-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 402,
          datetime: '2020-04-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -500,
          datetime: '2020-05-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 501,
          datetime: '2020-05-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 502,
          datetime: '2020-05-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -600,
          datetime: '2020-06-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 601,
          datetime: '2020-06-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 602,
          datetime: '2020-06-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -700,
          datetime: '2020-07-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 701,
          datetime: '2020-07-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 702,
          datetime: '2020-07-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -800,
          datetime: '2020-08-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 801,
          datetime: '2020-08-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 802,
          datetime: '2020-08-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -900,
          datetime: '2020-09-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 901,
          datetime: '2020-09-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 902,
          datetime: '2020-09-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -1000,
          datetime: '2020-10-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 1001,
          datetime: '2020-10-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 1002,
          datetime: '2020-10-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -1100,
          datetime: '2020-11-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 1101,
          datetime: '2020-11-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 1102,
          datetime: '2020-11-01',
          name: 'spending',
        }),
        buildTransaction({
          amount: -1200,
          datetime: '2020-12-01',
          name: 'earning',
        }),
        buildTransaction({
          amount: 1201,
          datetime: '2020-12-01',
          name: 'saving',
        }),
        buildTransaction({
          amount: 1202,
          datetime: '2020-12-01',
          name: 'spending',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      matchers: [
        buildMatcher({
          expectedValue: 'saving',
          property: 'name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={apiMocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('loading-indicator-totals-by-month')
  );
  const { getAllByRole } = within(
    await screen.findByTestId('section-totals-by-month')
  );
  const items = getAllByRole('listitem');
  const graph = await screen.findByTestId('totals-by-month-graph');
  expect(items[0]).toHaveTextContent(
    'December 2020 Earning: $12.00 Saving: $12.01 Spending: $12.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-december-2020',
    'earning-1200-saving-1201-spending-1202'
  );
  expect(items[1]).toHaveTextContent(
    'November 2020 Earning: $11.00 Saving: $11.01 Spending: $11.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-november-2020',
    'earning-1100-saving-1101-spending-1102'
  );
  expect(items[2]).toHaveTextContent(
    'October 2020 Earning: $10.00 Saving: $10.01 Spending: $10.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-october-2020',
    'earning-1000-saving-1001-spending-1002'
  );
  expect(items[3]).toHaveTextContent(
    'September 2020 Earning: $9.00 Saving: $9.01 Spending: $9.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-september-2020',
    'earning-900-saving-901-spending-902'
  );
  expect(items[4]).toHaveTextContent(
    'August 2020 Earning: $8.00 Saving: $8.01 Spending: $8.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-august-2020',
    'earning-800-saving-801-spending-802'
  );
  expect(items[5]).toHaveTextContent(
    'July 2020 Earning: $7.00 Saving: $7.01 Spending: $7.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-july-2020',
    'earning-700-saving-701-spending-702'
  );
  expect(items[6]).toHaveTextContent(
    'June 2020 Earning: $6.00 Saving: $6.01 Spending: $6.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-june-2020',
    'earning-600-saving-601-spending-602'
  );
  expect(items[7]).toHaveTextContent(
    'May 2020 Earning: $5.00 Saving: $5.01 Spending: $5.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-may-2020',
    'earning-500-saving-501-spending-502'
  );
  expect(items[8]).toHaveTextContent(
    'April 2020 Earning: $4.00 Saving: $4.01 Spending: $4.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-april-2020',
    'earning-400-saving-401-spending-402'
  );
  expect(items[9]).toHaveTextContent(
    'March 2020 Earning: $3.00 Saving: $3.01 Spending: $3.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-march-2020',
    'earning-300-saving-301-spending-302'
  );
  expect(items[10]).toHaveTextContent(
    'February 2020 Earning: $2.00 Saving: $2.01 Spending: $2.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-february-2020',
    'earning-200-saving-201-spending-202'
  );
  expect(items[11]).toHaveTextContent(
    'January 2020 Earning: $1.00 Saving: $1.01 Spending: $1.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-january-2020',
    'earning-100-saving-101-spending-102'
  );
  expect(items).toHaveLength(12);
});

test('shows loading indicator while transactions are loading', async () => {
  render(
    <TestGreenbacksProvider>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(screen.getByTestId('loading-indicator-totals-by-month')).toBeVisible();
  expect(screen.queryByTestId('totals-by-month-graph')).not.toBeInTheDocument();
});
