import React from 'react';
import { render, screen, within } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildFilter, { buildMatcher } from '__test__/utils/buildFilter';
import buildTransaction from '__test__/utils/buildTransaction';
import { Category } from 'types/transaction';

test('correctly averages spending', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'first name',
        }),
        buildTransaction({
          amount: 2400,
          datetime: '2020-01-01',
          name: 'second name',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Spending,
      matchers: [
        buildMatcher({ expectedValue: 'first name', property: 'name' }),
      ],
      tagToAssign: 'first tag',
    }),
    buildFilter({
      categoryToAssign: Category.Spending,
      matchers: [
        buildMatcher({ expectedValue: 'second name', property: 'name' }),
      ],
      tagToAssign: 'second tag',
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      route="/spending"
      now="2021-01-01"
      filters={filters}
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findAllByRole } = within(
    await screen.findByTestId('section-average-spending-by-tag')
  );
  const items = await findAllByRole('listitem');
  expect(items[0]).toHaveTextContent(/second tag: \$2.00/);
  expect(items[1]).toHaveTextContent(/first tag: \$1.00/);
  expect(items).toHaveLength(2);
  const graph = await screen.findByTestId('average-spending-by-tag-graph');
  expect(graph).toHaveAttribute('data-tag-first-tag', '100');
  expect(graph).toHaveAttribute('data-tag-second-tag', '200');
});

test('excludes savings', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'first name',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'second name',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Saving,
      matchers: [
        buildMatcher({ expectedValue: 'first name', property: 'name' }),
      ],
    }),
    buildFilter({
      categoryToAssign: Category.Spending,
      matchers: [
        buildMatcher({ expectedValue: 'second name', property: 'name' }),
      ],
      tagToAssign: 'second tag',
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      route="/spending"
      now="2021-01-01"
      filters={filters}
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findAllByRole } = within(
    await screen.findByTestId('section-average-spending-by-tag')
  );
  const items = await findAllByRole('listitem');
  expect(items[0]).toHaveTextContent(/second tag: \$1.00/);
  expect(items).toHaveLength(1);
  const graph = await screen.findByTestId('average-spending-by-tag-graph');
  expect(graph).toHaveAttribute('data-tag-second-tag', '100');
});

test('excludes earnings', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'first name',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'second name',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Earning,
      matchers: [
        buildMatcher({ expectedValue: 'first name', property: 'name' }),
      ],
    }),
    buildFilter({
      categoryToAssign: Category.Spending,
      matchers: [
        buildMatcher({ expectedValue: 'second name', property: 'name' }),
      ],
      tagToAssign: 'second tag',
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      route="/spending"
      now="2021-01-01"
      filters={filters}
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findAllByRole } = within(
    await screen.findByTestId('section-average-spending-by-tag')
  );
  const items = await findAllByRole('listitem');
  expect(items[0]).toHaveTextContent(/second tag: \$1.00/);
  expect(items).toHaveLength(1);
  const graph = await screen.findByTestId('average-spending-by-tag-graph');
  expect(graph).toHaveAttribute('data-tag-second-tag', '100');
});

test('excludes hidden transactions', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'first name',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'second name',
        }),
      ],
    }),
  ];
  const filters = [
    buildFilter({
      categoryToAssign: Category.Hidden,
      matchers: [
        buildMatcher({ expectedValue: 'first name', property: 'name' }),
      ],
    }),
    buildFilter({
      categoryToAssign: Category.Spending,
      matchers: [
        buildMatcher({ expectedValue: 'second name', property: 'name' }),
      ],
      tagToAssign: 'second tag',
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      route="/spending"
      now="2021-01-01"
      filters={filters}
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findAllByRole } = within(
    await screen.findByTestId('section-average-spending-by-tag')
  );
  const items = await findAllByRole('listitem');
  expect(items[0]).toHaveTextContent(/second tag: \$1.00/);
  expect(items).toHaveLength(1);
  const graph = await screen.findByTestId('average-spending-by-tag-graph');
  expect(graph).toHaveAttribute('data-tag-second-tag', '100');
});

test('groups untagged transactions', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'first name',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'second name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/spending" now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const { findAllByRole } = within(
    await screen.findByTestId('section-average-spending-by-tag')
  );
  const items = await findAllByRole('listitem');
  expect(items[0]).toHaveTextContent(/Untagged: \$2.00/);
  expect(items).toHaveLength(1);
  const graph = await screen.findByTestId('average-spending-by-tag-graph');
  expect(graph).toHaveAttribute('data-tag-Untagged', '200');
});

test('shows loading indicator', async () => {
  render(
    <TestGreenbacksProvider>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    screen.getByTestId('loading-indicator-average-spending-by-tag')
  ).toBeVisible();
  expect(
    screen.queryByTestId('average-spending-by-tag-graph')
  ).not.toBeInTheDocument();
});
