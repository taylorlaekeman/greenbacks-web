import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import Category from 'types/category';
import Transaction from 'types/unfilteredTransaction';
import wait from 'utils/wait';

test('shows loading indicator while transactions are loading', () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-average-savings-rate'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows dash without any transactions', async () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-savings-rate');
  expect(text).toHaveTextContent('-');
});

test('correctly calculates savings rate', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -100, datetime: '2020-01-01' }),
        buildTransaction({
          amount: 50,
          datetime: '2020-01-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -100, datetime: '2020-02-01' }),
        buildTransaction({
          amount: 50,
          datetime: '2020-02-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -100, datetime: '2020-03-01' }),
        buildTransaction({
          amount: 50,
          datetime: '2020-03-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -200, datetime: '2020-04-01' }),
        buildTransaction({
          amount: 100,
          datetime: '2020-04-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -200, datetime: '2020-05-01' }),
        buildTransaction({
          amount: 100,
          datetime: '2020-05-01',
          name: 'SAVINGS!',
        }),
        buildTransaction({ amount: -200, datetime: '2020-06-01' }),
        buildTransaction({
          amount: 100,
          datetime: '2020-06-01',
          name: 'SAVINGS!',
        }),
      ],
    }),
  ];
  const filters = [
    {
      categoryToAssign: Category.Saving,
      id: 'test-filter-id',
      matchers: [
        {
          expectedValue: 'SAVINGS!',
          property: 'name' as keyof Transaction,
        },
      ],
      tagToAssign: 'retirement',
    },
  ];
  render(
    <TestGreenbacksProvider filters={filters} mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByTestId('average-savings-rate');
  expect(text).toHaveTextContent('50%');
});

test('shows label text', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [buildTransaction({ amount: 600, datetime: '2020-01-01' })],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  expect(screen.getByText(/Savings rate/)).toBeInTheDocument();
});

test('shows reauthentication required error when transactions endpoint returns reauthentication required error', async () => {
  const mocks = [
    buildApiTransactionsMock({
      errors: ['Reauthentication required for a connected account'],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const text = screen.getByText(
    /At least one of your accounts needs reauthentication/
  );
  const link = screen.getByRole('link');
  expect(text).toBeInTheDocument();
  expect(link).toBeInTheDocument();
});

test('reauthentication required error link redirects to acounts page', async () => {
  const mocks = [
    buildApiTransactionsMock({
      errors: ['Reauthentication required for a connected account'],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(() => wait({ cycles: 2 }));
  const link = screen.getByRole('link');
  userEvent.click(link);
  const pageWrapper = screen.getByTestId('accounts-page');
  expect(pageWrapper).toBeInTheDocument();
});
