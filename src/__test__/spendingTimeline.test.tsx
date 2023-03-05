import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';

test('renders current month by default', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 2400,
          datetime: '2020-11-15',
        }),
        buildTransaction({
          amount: 3600,
          datetime: '2020-11-14',
        }),
      ],
    }),
    buildApiTransactionsMock({
      endDate: '2021-01-31',
      startDate: '2021-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-15',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/spending-timeline"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graph = await screen.findByTestId('spending-timeline-graph');
  expect(graph).toHaveAttribute('data-15-actual', '1200');
  expect(graph).toHaveAttribute('data-14-average', '300');
  expect(graph).toHaveAttribute('data-15-average', '500');
});

test('renders month from url', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-12-31',
      startDate: '2021-01-01',
      transactions: [
        buildTransaction({
          amount: 2400,
          datetime: '2021-11-15',
        }),
        buildTransaction({
          amount: 3600,
          datetime: '2021-11-14',
        }),
      ],
    }),
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
      route="/spending-timeline/2020-12"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graph = await screen.findByTestId('spending-timeline-graph');
  expect(graph).toHaveAttribute('data-15-actual', '1200');
  expect(graph).toHaveAttribute('data-14-average', '300');
  expect(graph).toHaveAttribute('data-15-average', '500');
});
