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
import { Category, CoreTransaction } from 'types/transaction';

test('shows savings', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          merchant: 'first merchant',
          name: 'first name',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-01-15',
          merchant: 'second merchant',
          name: 'second name',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-01-15',
          merchant: 'third merchant',
          name: 'hidden',
        }),
      ],
    }),
    buildFiltersMock({
      filters: [
        buildFilter({
          categoryToAssign: Category.Saving,
          id: 'test-filter-id-1',
          matchers: [
            {
              expectedValue: 'first name',
              property: 'name' as keyof CoreTransaction,
            },
          ],
          tagToAssign: 'first tag',
        }),
        buildFilter({
          categoryToAssign: Category.Saving,
          id: 'test-filter-id-1',
          matchers: [
            {
              expectedValue: 'second name',
              property: 'name' as keyof CoreTransaction,
            },
          ],
          tagToAssign: 'second tag',
        }),
        buildFilter({
          categoryToAssign: Category.Hidden,
          matchers: [
            buildMatcher({ expectedValue: 'hidden', property: 'name' }),
          ],
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/widgets/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByText, queryByTestId, queryByText } = within(
    await screen.findByTestId('section-monthly-savings')
  );
  await waitForElementToBeRemoved(() =>
    queryByTestId('loading-indicator-monthly-savings')
  );
  expect(getByText('2020-01-01')).toBeVisible();
  expect(
    getByText(/\$1.00—first merchant \(first name\) first tag/)
  ).toBeVisible();
  expect(getByText('2020-01-15')).toBeVisible();
  expect(
    getByText(/\$2.00—second merchant \(second name\) second tag/)
  ).toBeVisible();
  expect(queryByText(/third merchant/)).not.toBeInTheDocument();
});

test('shows loading indicator while transactions are loading', () => {
  render(
    <TestGreenbacksProvider route="/widgets">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-monthly-savings'
  );
  expect(loadingIndicator).toBeInTheDocument();
});
