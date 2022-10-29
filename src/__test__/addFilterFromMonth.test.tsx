import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';

test('adds spending filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-monthly-spending')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  userEvent.click(
    getByRole('radio', { name: "Transactions with name 'test name'" })
  );
  userEvent.click(getByRole('radio', { name: 'Spending' }));
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Tag' }),
    'test tag'
  );
  userEvent.click(screen.getByRole('button', { name: 'Add filter' }));
  const { getByText } = within(
    screen.getByTestId('section-monthly-spending-by-tag')
  );
  expect(getByText(/test tag: \$1.00/)).toBeVisible();
});

test('adds saving filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-monthly-spending')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  userEvent.click(
    getByRole('radio', { name: "Transactions with name 'test name'" })
  );
  userEvent.click(getByRole('radio', { name: 'Saving' }));
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Tag' }),
    'test tag'
  );
  userEvent.click(screen.getByRole('button', { name: 'Add filter' }));
  expect(screen.getByText(/Total Saving: \$1.00/)).toBeVisible();
});

test('allows selecting existing filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      matchers: [],
      tagToAssign: 'test tag',
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-01-01" filters={filters}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-monthly-spending')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  userEvent.click(
    getByRole('radio', { name: "Transactions with name 'test name'" })
  );
  userEvent.click(getByRole('radio', { name: 'Spending' }));
  userEvent.click(getByRole('radio', { name: 'test tag' }));
  userEvent.click(screen.getByRole('button', { name: 'Add filter' }));
  const { getByText } = within(
    screen.getByTestId('section-monthly-spending-by-tag')
  );
  expect(getByText(/test tag: \$1.00/)).toBeVisible();
});

test('defaults to name filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-monthly-spending')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  expect(
    getByRole('radio', { name: "Transactions with name 'test name'" })
  ).toHaveAttribute('checked');
});

test('untagged spending defaults to spending category', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-monthly-spending')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  expect(getByRole('radio', { name: 'Spending' })).toHaveAttribute('checked');
});

test('adds merchant filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          merchant: 'test merchant',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} now="2020-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-monthly-spending')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  userEvent.click(
    getByRole('radio', { name: "Transactions from merchant 'test merchant'" })
  );
  userEvent.click(getByRole('radio', { name: 'Spending' }));
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Tag' }),
    'test tag'
  );
  userEvent.click(screen.getByRole('button', { name: 'Add filter' }));
  const { getByText } = within(
    screen.getByTestId('section-monthly-spending-by-tag')
  );
  expect(getByText(/test tag: \$1.00/)).toBeVisible();
});
