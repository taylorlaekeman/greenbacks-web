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
  const titles = getAllByRole('heading');
  const items = getAllByRole('listitem');
  expect(titles[1]).toHaveTextContent('December 2020');
  expect(items[0]).toHaveTextContent('Earning: $12.00');
  expect(items[1]).toHaveTextContent('Saving: $12.01');
  expect(items[2]).toHaveTextContent('Spending: $12.02');
  expect(titles[2]).toHaveTextContent('November 2020');
  expect(items[3]).toHaveTextContent('Earning: $11.00');
  expect(items[4]).toHaveTextContent('Saving: $11.01');
  expect(items[5]).toHaveTextContent('Spending: $11.02');
  expect(titles[3]).toHaveTextContent('October 2020');
  expect(items[6]).toHaveTextContent('Earning: $10.00');
  expect(items[7]).toHaveTextContent('Saving: $10.01');
  expect(items[8]).toHaveTextContent('Spending: $10.02');
  expect(titles[4]).toHaveTextContent('September 2020');
  expect(items[9]).toHaveTextContent('Earning: $9.00');
  expect(items[10]).toHaveTextContent('Saving: $9.01');
  expect(items[11]).toHaveTextContent('Spending: $9.02');
  expect(titles[5]).toHaveTextContent('August 2020');
  expect(items[12]).toHaveTextContent('Earning: $8.00');
  expect(items[13]).toHaveTextContent('Saving: $8.01');
  expect(items[14]).toHaveTextContent('Spending: $8.02');
  expect(titles[6]).toHaveTextContent('July 2020');
  expect(items[15]).toHaveTextContent('Earning: $7.00');
  expect(items[16]).toHaveTextContent('Saving: $7.01');
  expect(items[17]).toHaveTextContent('Spending: $7.02');
  expect(titles[7]).toHaveTextContent('June 2020');
  expect(items[18]).toHaveTextContent('Earning: $6.00');
  expect(items[19]).toHaveTextContent('Saving: $6.01');
  expect(items[20]).toHaveTextContent('Spending: $6.02');
  expect(titles[8]).toHaveTextContent('May 2020');
  expect(items[21]).toHaveTextContent('Earning: $5.00');
  expect(items[22]).toHaveTextContent('Saving: $5.01');
  expect(items[23]).toHaveTextContent('Spending: $5.02');
  expect(titles[9]).toHaveTextContent('April 2020');
  expect(items[24]).toHaveTextContent('Earning: $4.00');
  expect(items[25]).toHaveTextContent('Saving: $4.01');
  expect(items[26]).toHaveTextContent('Spending: $4.02');
  expect(titles[10]).toHaveTextContent('March 2020');
  expect(items[27]).toHaveTextContent('Earning: $3.00');
  expect(items[28]).toHaveTextContent('Saving: $3.01');
  expect(items[29]).toHaveTextContent('Spending: $3.02');
  expect(titles[11]).toHaveTextContent('February 2020');
  expect(items[30]).toHaveTextContent('Earning: $2.00');
  expect(items[31]).toHaveTextContent('Saving: $2.01');
  expect(items[32]).toHaveTextContent('Spending: $2.02');
  expect(titles[12]).toHaveTextContent('January 2020');
  expect(items[33]).toHaveTextContent('Earning: $1.00');
  expect(items[34]).toHaveTextContent('Saving: $1.01');
  expect(items[35]).toHaveTextContent('Spending: $1.02');
  expect(titles).toHaveLength(13);
  expect(items).toHaveLength(36);
});

test('shows loading indicator while transactions are loading', async () => {
  render(
    <TestGreenbacksProvider>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(screen.getByTestId('loading-indicator-totals-by-month')).toBeVisible();
});
