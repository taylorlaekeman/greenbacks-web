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
import buildFiltersMock from '__test__/utils/buildFiltersMock';
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
    buildFiltersMock({
      filters: [
        buildFilter({
          categoryToAssign: Category.Saving,
          matchers: [
            buildMatcher({
              expectedValue: 'saving',
              property: 'name',
            }),
          ],
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/totals-by-month"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('loading-indicator-totals-by-month')
  );
  const { getByRole } = within(
    await screen.findByTestId('section-totals-by-month')
  );
  const graph = await screen.findByTestId('totals-by-month-graph');
  expect(
    getByRole('cell', { name: 'december-2020-earning' })
  ).toHaveTextContent('$12.00');
  expect(getByRole('cell', { name: 'december-2020-saving' })).toHaveTextContent(
    '$12.01'
  );
  expect(
    getByRole('cell', { name: 'december-2020-spending' })
  ).toHaveTextContent('$12.02');
  expect(graph).toHaveAttribute(
    'data-month-december-2020',
    'earning-1200-saving-1201-spending-1202'
  );
  expect(
    getByRole('cell', { name: 'november-2020-earning' })
  ).toHaveTextContent('$11.00');
  expect(getByRole('cell', { name: 'november-2020-saving' })).toHaveTextContent(
    '$11.01'
  );
  expect(
    getByRole('cell', { name: 'november-2020-spending' })
  ).toHaveTextContent('$11.02');
  expect(graph).toHaveAttribute(
    'data-month-november-2020',
    'earning-1100-saving-1101-spending-1102'
  );
  expect(getByRole('cell', { name: 'october-2020-earning' })).toHaveTextContent(
    '$10.00'
  );
  expect(getByRole('cell', { name: 'october-2020-saving' })).toHaveTextContent(
    '$10.01'
  );
  expect(
    getByRole('cell', { name: 'october-2020-spending' })
  ).toHaveTextContent('$10.02');
  expect(graph).toHaveAttribute(
    'data-month-october-2020',
    'earning-1000-saving-1001-spending-1002'
  );
  expect(
    getByRole('cell', { name: 'september-2020-earning' })
  ).toHaveTextContent('$9.00');
  expect(
    getByRole('cell', { name: 'september-2020-saving' })
  ).toHaveTextContent('$9.01');
  expect(
    getByRole('cell', { name: 'september-2020-spending' })
  ).toHaveTextContent('$9.02');
  expect(graph).toHaveAttribute(
    'data-month-september-2020',
    'earning-900-saving-901-spending-902'
  );
  expect(getByRole('cell', { name: 'august-2020-earning' })).toHaveTextContent(
    '$8.00'
  );
  expect(getByRole('cell', { name: 'august-2020-saving' })).toHaveTextContent(
    '$8.01'
  );
  expect(getByRole('cell', { name: 'august-2020-spending' })).toHaveTextContent(
    '$8.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-august-2020',
    'earning-800-saving-801-spending-802'
  );
  expect(getByRole('cell', { name: 'july-2020-earning' })).toHaveTextContent(
    '$7.00'
  );
  expect(getByRole('cell', { name: 'july-2020-saving' })).toHaveTextContent(
    '$7.01'
  );
  expect(getByRole('cell', { name: 'july-2020-spending' })).toHaveTextContent(
    '$7.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-july-2020',
    'earning-700-saving-701-spending-702'
  );
  expect(getByRole('cell', { name: 'june-2020-earning' })).toHaveTextContent(
    '$6.00'
  );
  expect(getByRole('cell', { name: 'june-2020-saving' })).toHaveTextContent(
    '$6.01'
  );
  expect(getByRole('cell', { name: 'june-2020-spending' })).toHaveTextContent(
    '$6.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-june-2020',
    'earning-600-saving-601-spending-602'
  );
  expect(getByRole('cell', { name: 'may-2020-earning' })).toHaveTextContent(
    '$5.00'
  );
  expect(getByRole('cell', { name: 'may-2020-saving' })).toHaveTextContent(
    '$5.01'
  );
  expect(getByRole('cell', { name: 'may-2020-spending' })).toHaveTextContent(
    '$5.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-may-2020',
    'earning-500-saving-501-spending-502'
  );
  expect(getByRole('cell', { name: 'april-2020-earning' })).toHaveTextContent(
    '$4.00'
  );
  expect(getByRole('cell', { name: 'april-2020-saving' })).toHaveTextContent(
    '$4.01'
  );
  expect(getByRole('cell', { name: 'april-2020-spending' })).toHaveTextContent(
    '$4.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-april-2020',
    'earning-400-saving-401-spending-402'
  );
  expect(getByRole('cell', { name: 'march-2020-earning' })).toHaveTextContent(
    '$3.00'
  );
  expect(getByRole('cell', { name: 'march-2020-saving' })).toHaveTextContent(
    '$3.01'
  );
  expect(getByRole('cell', { name: 'march-2020-spending' })).toHaveTextContent(
    '$3.02'
  );
  expect(graph).toHaveAttribute(
    'data-month-march-2020',
    'earning-300-saving-301-spending-302'
  );
  expect(
    getByRole('cell', { name: 'february-2020-earning' })
  ).toHaveTextContent('$2.00');
  expect(getByRole('cell', { name: 'february-2020-saving' })).toHaveTextContent(
    '$2.01'
  );
  expect(
    getByRole('cell', { name: 'february-2020-spending' })
  ).toHaveTextContent('$2.02');
  expect(graph).toHaveAttribute(
    'data-month-february-2020',
    'earning-200-saving-201-spending-202'
  );
  expect(getByRole('cell', { name: 'january-2020-earning' })).toHaveTextContent(
    '$1.00'
  );
  expect(getByRole('cell', { name: 'january-2020-saving' })).toHaveTextContent(
    '$1.01'
  );
  expect(
    getByRole('cell', { name: 'january-2020-spending' })
  ).toHaveTextContent('$1.02');
  expect(graph).toHaveAttribute(
    'data-month-january-2020',
    'earning-100-saving-101-spending-102'
  );
});

test('shows loading indicator while transactions are loading', async () => {
  render(
    <TestGreenbacksProvider route="/totals-by-month">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(screen.getByTestId('loading-indicator-totals-by-month')).toBeVisible();
  expect(screen.queryByTestId('totals-by-month-graph')).not.toBeInTheDocument();
});
