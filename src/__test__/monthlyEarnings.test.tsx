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

test('shows earnings', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -100,
          datetime: '2020-01-01',
          merchant: 'first merchant',
          name: 'first name',
        }),
        buildTransaction({
          amount: -200,
          datetime: '2020-01-15',
          merchant: 'second merchant',
          name: 'second name',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-06-01',
          merchant: 'third merchant',
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
    <TestGreenbacksProvider
      mocks={apiMocks}
      filters={filters}
      route="/widgets/months/2020-01/"
    >
      <Greenbacks />
    </TestGreenbacksProvider>,
  );
  const { getByText, queryByTestId, queryByText } = within(
    await screen.findByTestId('section-monthly-earnings'),
  );
  await waitForElementToBeRemoved(() =>
    queryByTestId('loading-indicator-monthly-earnings'),
  );
  expect(getByText('2020-01-01')).toBeVisible();
  expect(getByText(/\$1.00—first merchant \(first name\)/)).toBeVisible();
  expect(getByText('2020-01-15')).toBeVisible();
  expect(getByText(/\$2.00—second merchant \(second name\)/)).toBeVisible();
  expect(
    queryByText(/\$2.00—third merchant \(hidden\)/),
  ).not.toBeInTheDocument();
});

test('shows loading indicator while transactions are loading', () => {
  render(
    <TestGreenbacksProvider route="/widgets">
      <Greenbacks />
    </TestGreenbacksProvider>,
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-monthly-earnings',
  );
  expect(loadingIndicator).toBeInTheDocument();
});
