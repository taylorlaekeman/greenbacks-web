import React from 'react';
import { render, screen, within } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';

test('shows untagged debits', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          datetime: '2020-01-01',
          id: 'first-id',
          merchant: 'first merchant',
          name: 'first name',
        }),
        buildTransaction({
          amount: 200,
          datetime: '2020-01-02',
          id: 'second-id',
          merchant: 'second merchant',
          name: 'second name',
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
  const { getAllByRole, getByRole } = within(
    await screen.findByTestId('section-untagged-debits')
  );
  expect(getByRole('heading')).toHaveTextContent('Untagged Debits (2)');
  const items = getAllByRole('listitem');
  expect(items[0]).toHaveTextContent(
    '$2.00—second name (second merchant)—2020-01-02'
  );
  expect(items[1]).toHaveTextContent(
    '$1.00—first name (first merchant)—2020-01-01'
  );
  expect(items).toHaveLength(2);
});

test('shows untagged credits', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -100,
          datetime: '2020-01-01',
          id: 'first-id',
          merchant: 'first merchant',
          name: 'first name',
        }),
        buildTransaction({
          amount: -200,
          datetime: '2020-01-02',
          id: 'second-id',
          merchant: 'second merchant',
          name: 'second name',
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
  const { getAllByRole, getByRole } = within(
    await screen.findByTestId('section-untagged-credits')
  );
  expect(getByRole('heading')).toHaveTextContent('Untagged Credits (2)');
  const items = getAllByRole('listitem');
  expect(items[0]).toHaveTextContent(
    '$2.00—second name (second merchant)—2020-01-02'
  );
  expect(items[1]).toHaveTextContent(
    '$1.00—first name (first merchant)—2020-01-01'
  );
  expect(items).toHaveLength(2);
});
