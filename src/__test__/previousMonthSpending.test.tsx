import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';

test('renders last month by default', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-12-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-12-15',
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/previous-month-spending"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graph = await screen.findByTestId('spending-timeline-graph');
  expect(graph).toHaveAttribute('data-2020-12-15', '1200');
});

test('renders month from url', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-12-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-12-15',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2022-01-01"
      route="/previous-month-spending/2020-12"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graph = await screen.findByTestId('spending-timeline-graph');
  expect(graph).toHaveAttribute('data-2020-12-15', '1200');
});
