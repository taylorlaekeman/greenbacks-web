import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFiltersMock from '__test__/utils/buildFiltersMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';

test('renders current month by default', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 300 * 12,
          datetime: '2020-11-01',
          name: 'first-name',
        }),
        buildTransaction({
          amount: 100 * 12,
          datetime: '2020-11-15',
          name: 'second-name',
        }),
        buildTransaction({
          amount: 200 * 12,
          datetime: '2020-11-16',
          name: 'third-name',
        }),
      ],
    }),
    buildApiTransactionsMock({
      endDate: '2021-01-31',
      startDate: '2021-01-01',
      transactions: [
        buildTransaction({
          amount: 400,
          datetime: '2021-01-01',
          name: 'first-name',
        }),
        buildTransaction({
          amount: 300,
          datetime: '2021-01-15',
          name: 'second-name',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2021-01-15',
          name: 'third-name',
        }),
      ],
    }),
    buildFiltersMock({
      filters: [
        buildFilter({
          matchers: [
            buildMatcher({ expectedValue: 'first-name', property: 'name' }),
          ],
          tagToAssign: 'first-tag',
        }),
        buildFilter({
          matchers: [
            buildMatcher({ expectedValue: 'second-name', property: 'name' }),
          ],
          tagToAssign: 'second-tag',
        }),
        buildFilter({
          matchers: [
            buildMatcher({ expectedValue: 'third-name', property: 'name' }),
          ],
          tagToAssign: 'third-tag',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-15"
      route="/monthly-spending-by-tag"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graph = await screen.findByTestId('monthly-spending-by-tag-graph');
  expect(graph).toHaveAttribute('data-first-tag', '400');
  expect(graph).toHaveAttribute('data-first-tag-average', '300');
  expect(graph).toHaveAttribute('data-second-tag', '300');
  expect(graph).toHaveAttribute('data-second-tag-average', '100');
  expect(graph).toHaveAttribute('data-third-tag', '100');
  expect(graph).toHaveAttribute('data-third-tag-average', '200');
});

test('renders month from url', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 300 * 12,
          datetime: '2020-11-01',
          name: 'first-name',
        }),
        buildTransaction({
          amount: 100 * 12,
          datetime: '2020-11-15',
          name: 'second-name',
        }),
        buildTransaction({
          amount: 200 * 12,
          datetime: '2020-11-16',
          name: 'third-name',
        }),
      ],
    }),
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-12-01',
      transactions: [
        buildTransaction({
          amount: 400,
          datetime: '2020-12-01',
          name: 'first-name',
        }),
        buildTransaction({
          amount: 300,
          datetime: '2020-12-15',
          name: 'second-name',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2020-12-15',
          name: 'third-name',
        }),
      ],
    }),
    buildFiltersMock({
      filters: [
        buildFilter({
          matchers: [
            buildMatcher({ expectedValue: 'first-name', property: 'name' }),
          ],
          tagToAssign: 'first-tag',
        }),
        buildFilter({
          matchers: [
            buildMatcher({ expectedValue: 'second-name', property: 'name' }),
          ],
          tagToAssign: 'second-tag',
        }),
        buildFilter({
          matchers: [
            buildMatcher({ expectedValue: 'third-name', property: 'name' }),
          ],
          tagToAssign: 'third-tag',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-15"
      route="/monthly-spending-by-tag/2020-12"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graph = await screen.findByTestId('monthly-spending-by-tag-graph');
  expect(graph).toHaveAttribute('data-first-tag', '400');
  expect(graph).toHaveAttribute('data-first-tag-average', '300');
  expect(graph).toHaveAttribute('data-second-tag', '300');
  expect(graph).toHaveAttribute('data-second-tag-average', '100');
  expect(graph).toHaveAttribute('data-third-tag', '100');
  expect(graph).toHaveAttribute('data-third-tag-average', '200');
});
