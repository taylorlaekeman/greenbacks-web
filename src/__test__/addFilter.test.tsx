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
      endDate: '2021-01-01',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/untagged-transactions"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-debits')
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
  expect(
    screen.queryByRole('button', { name: 'filter' })
  ).not.toBeInTheDocument();
});

test('adds earning filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-01',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -1200,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/untagged-transactions"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-credits')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  userEvent.click(
    getByRole('radio', { name: "Transactions with name 'test name'" })
  );
  userEvent.click(getByRole('radio', { name: 'Earning' }));
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Tag' }),
    'test tag'
  );
  userEvent.click(screen.getByRole('button', { name: 'Add filter' }));
  expect(
    screen.queryByRole('button', { name: 'filter' })
  ).not.toBeInTheDocument();
});

test('adds saving filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-01',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/untagged-transactions"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-debits')
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
  expect(
    screen.queryByRole('button', { name: 'filter' })
  ).not.toBeInTheDocument();
});

test('allows selecting existing filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-01',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
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
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      filters={filters}
      route="/untagged-transactions"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-debits')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  userEvent.click(
    getByRole('radio', { name: "Transactions with name 'test name'" })
  );
  userEvent.click(getByRole('radio', { name: 'Spending' }));
  userEvent.click(getByRole('radio', { name: 'test tag' }));
  userEvent.click(screen.getByRole('button', { name: 'Add filter' }));
  expect(
    screen.queryByRole('button', { name: 'Add filter' })
  ).not.toBeInTheDocument();
});

test('defaults to name filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-01',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/untagged-transactions"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-debits')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  expect(
    getByRole('radio', { name: "Transactions with name 'test name'" })
  ).toHaveAttribute('checked');
});

test('untagged spending defaults to spending category', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-01',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/untagged-transactions"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-debits')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  expect(getByRole('radio', { name: 'Spending' })).toHaveAttribute('checked');
});

test('untagged earning defaults to earning category', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-01',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -1200,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/untagged-transactions"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-credits')
  );
  userEvent.click(getByRole('button', { name: 'filter' }));
  expect(getByRole('radio', { name: 'Earning' })).toHaveProperty('checked');
});

test('adds merchant filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-01-01',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          merchant: 'test merchant',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/untagged-transactions"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { getByRole } = within(
    await screen.findByTestId('section-untagged-debits')
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
  expect(
    screen.queryByRole('button', { name: 'Add filter' })
  ).not.toBeInTheDocument();
});
