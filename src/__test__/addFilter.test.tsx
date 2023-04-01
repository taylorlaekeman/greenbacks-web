import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildAddFilterMock from '__test__/utils/buildAddFilterMock';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFiltersMock from '__test__/utils/buildFiltersMock';
import buildFilter from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import { Comparator } from 'types/filter';
import { Category } from 'types/transaction';

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
    buildAddFilterMock({
      filter: {
        categoryToAssign: Category.Spending,
        matchers: [
          {
            comparator: Comparator.Equals,
            expectedValue: 'test name',
            property: 'name',
          },
        ],
        tagToAssign: 'test tag',
      },
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
  expect(await screen.findByText('Added!')).toBeVisible();
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
    buildAddFilterMock({
      filter: {
        categoryToAssign: Category.Earning,
        matchers: [
          {
            comparator: Comparator.Equals,
            expectedValue: 'test name',
            property: 'name',
          },
        ],
        tagToAssign: 'test tag',
      },
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
  expect(await screen.findByText('Added!')).toBeVisible();
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
    buildAddFilterMock({
      filter: {
        categoryToAssign: Category.Saving,
        matchers: [
          {
            comparator: Comparator.Equals,
            expectedValue: 'test name',
            property: 'name',
          },
        ],
        tagToAssign: 'test tag',
      },
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
  expect(await screen.findByText('Added!')).toBeVisible();
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
    buildFiltersMock({
      filters: [
        buildFilter({
          matchers: [],
          tagToAssign: 'test tag',
        }),
      ],
    }),
    buildAddFilterMock({
      filter: {
        categoryToAssign: Category.Spending,
        matchers: [
          {
            comparator: Comparator.Equals,
            expectedValue: 'test name',
            property: 'name',
          },
        ],
        tagToAssign: 'test tag',
      },
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
  userEvent.click(getByRole('radio', { name: 'test tag' }));
  userEvent.click(screen.getByRole('button', { name: 'Add filter' }));
  expect(await screen.findByText('Added!')).toBeVisible();
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
    buildAddFilterMock({
      filter: {
        categoryToAssign: Category.Spending,
        matchers: [
          {
            comparator: Comparator.Equals,
            expectedValue: 'test merchant',
            property: 'merchant',
          },
        ],
        tagToAssign: 'test tag',
      },
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
  expect(await screen.findByText('Added!')).toBeVisible();
});
