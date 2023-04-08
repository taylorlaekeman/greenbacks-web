import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFiltersMock from '__test__/utils/buildFiltersMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';

test('renders categories', async () => {
  const apiMocks = [
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
          amount: 100,
          datetime: '2021-01-15',
          name: 'third-name',
        }),
        buildTransaction({
          amount: 100,
          datetime: '2021-01-15',
          name: 'fourth-name',
        }),
        buildTransaction({
          amount: 300,
          datetime: '2021-01-15',
          name: 'second-name',
        }),
      ],
    }),
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 300 * 12,
          datetime: '2020-01-01',
          name: 'first-name',
        }),
        buildTransaction({
          amount: 300 * 12,
          datetime: '2020-01-15',
          name: 'second-name',
        }),
        buildTransaction({
          amount: 300 * 12,
          datetime: '2020-01-15',
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
        buildFilter({
          matchers: [
            buildMatcher({ expectedValue: 'fourth-name', property: 'name' }),
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
      route="/top-spending-categories"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const categories = await within(
    await screen.findByTestId('categories')
  ).findAllByRole('listitem');
  expect(categories[0]).toHaveTextContent(
    'first-tag: $4.00 ($1.00 above average)'
  );
  expect(categories[1]).toHaveTextContent(
    'second-tag: $3.00 ($0.00 above average)'
  );
  expect(categories[2]).toHaveTextContent(
    'third-tag: $2.00 ($1.00 below average)'
  );
});

test('renders transactions when category is expanded', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-31',
      startDate: '2021-01-01',
      transactions: [
        buildTransaction({
          amount: 400,
          datetime: '2021-01-01',
          merchant: 'first-merchant',
          name: 'first-name',
        }),
        buildTransaction({
          amount: 300,
          datetime: '2021-01-01',
          merchant: 'second-merchant',
          name: 'second-name',
        }),
      ],
    }),
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [],
    }),
    buildFiltersMock({
      filters: [],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-15"
      route="/top-spending-categories"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.click(
    await within(await screen.findByTestId('categories')).findByRole('button', {
      name: 'toggle',
    })
  );
  const categories = await within(
    await screen.findByTestId('category-Untagged')
  ).findAllByRole('listitem');
  expect(categories[0]).toHaveTextContent(
    '$4.00—first-name (first-merchant)—2021-01-01'
  );
  expect(categories[1]).toHaveTextContent(
    '$3.00—second-name (second-merchant)—2021-01-01'
  );
});
