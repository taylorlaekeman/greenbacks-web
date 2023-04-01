import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter from '__test__/utils/buildFilter';
import buildFiltersMock from '__test__/utils/buildFiltersMock';
import buildTransaction from '__test__/utils/buildTransaction';

test('shows totals by month', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-02-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-02-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 300,
          datetime: '2020-03-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-03-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-04-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-04-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 500,
          datetime: '2020-05-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-05-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-06-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-06-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 700,
          datetime: '2020-07-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-07-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 800,
          datetime: '2020-08-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-08-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 900,
          datetime: '2020-09-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-09-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 1000,
          datetime: '2020-10-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-10-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 1100,
          datetime: '2020-11-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-11-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-12-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-12-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 1300,
          datetime: '2021-01-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2021-01-01',
          name: 'spending-2',
        }),
      ],
    }),
    buildFiltersMock({
      filters: [
        buildFilter({
          matchers: [{ expectedValue: 'spending-1', property: 'name' }],
          tagToAssign: 'spending-1',
        }),
        buildFilter({
          matchers: [{ expectedValue: 'spending-2', property: 'name' }],
          tagToAssign: 'spending-2',
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
    screen.queryByTestId('loading-indicator-monthly-spending-by-tag-graph')
  );
  const graph = await screen.findByTestId('monthly-spending-by-tag-graph');
  screen.debug(graph);
  expect(graph).toHaveAttribute('data-2021-01-spending-1', '1300');
  expect(graph).toHaveAttribute('data-2021-01-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-12-spending-1', '1200');
  expect(graph).toHaveAttribute('data-2020-12-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-11-spending-1', '1100');
  expect(graph).toHaveAttribute('data-2020-11-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-10-spending-1', '1000');
  expect(graph).toHaveAttribute('data-2020-10-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-09-spending-1', '900');
  expect(graph).toHaveAttribute('data-2020-09-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-08-spending-1', '800');
  expect(graph).toHaveAttribute('data-2020-08-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-07-spending-1', '700');
  expect(graph).toHaveAttribute('data-2020-07-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-06-spending-1', '600');
  expect(graph).toHaveAttribute('data-2020-06-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-05-spending-1', '500');
  expect(graph).toHaveAttribute('data-2020-05-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-04-spending-1', '400');
  expect(graph).toHaveAttribute('data-2020-04-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-03-spending-1', '300');
  expect(graph).toHaveAttribute('data-2020-03-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-02-spending-1', '200');
  expect(graph).toHaveAttribute('data-2020-02-spending-2', '100');
  expect(graph).toHaveAttribute('data-2020-01-spending-1', '100');
  expect(graph).toHaveAttribute('data-2020-01-spending-2', '100');
});

test('only shows selected tags', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-02-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-02-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 300,
          datetime: '2020-03-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-03-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-04-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-04-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 500,
          datetime: '2020-05-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-05-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-06-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-06-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 700,
          datetime: '2020-07-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-07-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 800,
          datetime: '2020-08-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-08-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 900,
          datetime: '2020-09-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-09-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 1000,
          datetime: '2020-10-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-10-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 1100,
          datetime: '2020-11-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-11-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-12-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-12-01',
          name: 'spending-2',
        }),
        buildTransaction({
          amount: 1300,
          datetime: '2021-01-01',
          name: 'spending-1',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2021-01-01',
          name: 'spending-2',
        }),
      ],
    }),
    buildFiltersMock({
      filters: [
        buildFilter({
          matchers: [{ expectedValue: 'spending-1', property: 'name' }],
          tagToAssign: 'spending-1',
        }),
        buildFilter({
          matchers: [{ expectedValue: 'spending-2', property: 'name' }],
          tagToAssign: 'spending-2',
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
  userEvent.click(await screen.findByRole('checkbox', { name: 'spending-2' }));
  const graph = await screen.findByTestId('monthly-spending-by-tag-graph');
  expect(graph).toHaveAttribute('data-2021-01-spending-1', '1300');
  expect(graph).not.toHaveAttribute('data-2021-01-spending-2');
  expect(graph).toHaveAttribute('data-2020-12-spending-1', '1200');
  expect(graph).not.toHaveAttribute('data-2020-12-spending-2');
  expect(graph).toHaveAttribute('data-2020-11-spending-1', '1100');
  expect(graph).not.toHaveAttribute('data-2020-11-spending-2');
  expect(graph).toHaveAttribute('data-2020-10-spending-1', '1000');
  expect(graph).not.toHaveAttribute('data-2020-10-spending-2');
  expect(graph).toHaveAttribute('data-2020-09-spending-1', '900');
  expect(graph).not.toHaveAttribute('data-2020-09-spending-2');
  expect(graph).toHaveAttribute('data-2020-08-spending-1', '800');
  expect(graph).not.toHaveAttribute('data-2020-08-spending-2');
  expect(graph).toHaveAttribute('data-2020-07-spending-1', '700');
  expect(graph).not.toHaveAttribute('data-2020-07-spending-2');
  expect(graph).toHaveAttribute('data-2020-06-spending-1', '600');
  expect(graph).not.toHaveAttribute('data-2020-06-spending-2');
  expect(graph).toHaveAttribute('data-2020-05-spending-1', '500');
  expect(graph).not.toHaveAttribute('data-2020-05-spending-2');
  expect(graph).toHaveAttribute('data-2020-04-spending-1', '400');
  expect(graph).not.toHaveAttribute('data-2020-04-spending-2');
  expect(graph).toHaveAttribute('data-2020-03-spending-1', '300');
  expect(graph).not.toHaveAttribute('data-2020-03-spending-2');
  expect(graph).toHaveAttribute('data-2020-02-spending-1', '200');
  expect(graph).not.toHaveAttribute('data-2020-02-spending-2');
  expect(graph).toHaveAttribute('data-2020-01-spending-1', '100');
  expect(graph).not.toHaveAttribute('data-2020-01-spending-2');
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
