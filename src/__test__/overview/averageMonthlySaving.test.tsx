import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category, CoreTransaction } from 'types/transaction';
import wait from 'utils/wait';

test('shows loading indicator while transactions are loading', () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-average-monthly-savings'
  );
  expect(loadingIndicator).toBeInTheDocument();
  expect(screen.queryByText('per month on average')).not.toBeInTheDocument();
});

test('shows zero without any savings', async () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-monthly-savings');
  expect(text).toHaveTextContent('$0.00');
  expect(
    await screen.findByText('You save $0.00 per month on average')
  ).toBeVisible();
});

test('correctly averages savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 200,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-02-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-03-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-04-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-05-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: 400,
          datetime: '2020-06-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({
          amount: -400,
          datetime: '2020-06-01',
          name: 'hidden',
        }),
        buildTransaction({
          amount: -3600,
          datetime: '2020-01-01',
          name: 'earning',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      id: 'test-filter-id',
      matchers: [
        {
          expectedValue: 'SAVINGS!',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'retirement',
    }),
    buildFilter({
      categoryToAssign: Category.Hidden,
      matchers: [buildMatcher({ expectedValue: 'hidden', property: 'name' })],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2021-01-01" filters={filters}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByTestId('average-monthly-savings');
  expect(text).toHaveTextContent('$1.50');
  expect(
    await screen.findByText(
      'You save $1.50 per month on average (50% of earning)'
    )
  ).toBeVisible();
});

test('handles months without savings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'SAVINGS!',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'retirement',
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2021-01-01" filters={filters}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-monthly-savings');
  expect(text).toHaveTextContent('$1.00');
  expect(
    await screen.findByText('You save $1.00 per month on average')
  ).toBeVisible();
});

test('excludes expenses', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: 1200, datetime: '2020-01-01' }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'SAVINGS!',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'retirement',
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2021-01-01" filters={filters}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-monthly-savings');
  expect(text).toHaveTextContent('$1.00');
  expect(
    await screen.findByText('You save $1.00 per month on average')
  ).toBeVisible();
});

test('shows label text', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({ amount: 1200, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const label = screen.getByTestId('average-monthly-savings-label');
  expect(label).toHaveTextContent(/^Average monthly saving/);
});

test('does not show savings rate when average earnings are 0', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'saving',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      id: 'test-filter-id-1',
      matchers: [
        {
          expectedValue: 'saving',
          property: 'name' as keyof CoreTransaction,
        },
      ],
      tagToAssign: 'retirement',
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2021-01-01" filters={filters}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('You save $1.00 per month on average')
  ).toBeVisible();
});
