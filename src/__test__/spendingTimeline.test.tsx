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
          amount: 1200,
          datetime: '2020-11-01',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-11-15',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2020-11-16',
        }),
      ],
    }),
    buildApiTransactionsMock({
      endDate: '2021-01-31',
      startDate: '2021-01-01',
      transactions: [
        buildTransaction({
          amount: 600,
          datetime: '2021-01-01',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2021-01-15',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-15"
      route="/spending-timeline"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const graph = await screen.findByTestId('spending-timeline-graph');
  expect(graph).toHaveAttribute('data-01-actual', '600');
  expect(graph).toHaveAttribute('data-02-actual', '600');
  expect(graph).toHaveAttribute('data-03-actual', '600');
  expect(graph).toHaveAttribute('data-04-actual', '600');
  expect(graph).toHaveAttribute('data-05-actual', '600');
  expect(graph).toHaveAttribute('data-06-actual', '600');
  expect(graph).toHaveAttribute('data-07-actual', '600');
  expect(graph).toHaveAttribute('data-08-actual', '600');
  expect(graph).toHaveAttribute('data-09-actual', '600');
  expect(graph).toHaveAttribute('data-10-actual', '600');
  expect(graph).toHaveAttribute('data-11-actual', '600');
  expect(graph).toHaveAttribute('data-12-actual', '600');
  expect(graph).toHaveAttribute('data-13-actual', '600');
  expect(graph).toHaveAttribute('data-14-actual', '600');
  expect(graph).toHaveAttribute('data-15-actual', '1200');
  expect(graph).not.toHaveAttribute('data-16-actual');
  expect(graph).not.toHaveAttribute('data-17-actual');
  expect(graph).not.toHaveAttribute('data-18-actual');
  expect(graph).not.toHaveAttribute('data-19-actual');
  expect(graph).not.toHaveAttribute('data-20-actual');
  expect(graph).not.toHaveAttribute('data-21-actual');
  expect(graph).not.toHaveAttribute('data-22-actual');
  expect(graph).not.toHaveAttribute('data-23-actual');
  expect(graph).not.toHaveAttribute('data-24-actual');
  expect(graph).not.toHaveAttribute('data-25-actual');
  expect(graph).not.toHaveAttribute('data-26-actual');
  expect(graph).not.toHaveAttribute('data-27-actual');
  expect(graph).not.toHaveAttribute('data-28-actual');
  expect(graph).not.toHaveAttribute('data-29-actual');
  expect(graph).not.toHaveAttribute('data-30-actual');
  expect(graph).not.toHaveAttribute('data-31-actual');
  expect(graph).toHaveAttribute('data-01-average', '100');
  expect(graph).toHaveAttribute('data-02-average', '100');
  expect(graph).toHaveAttribute('data-03-average', '100');
  expect(graph).toHaveAttribute('data-04-average', '100');
  expect(graph).toHaveAttribute('data-05-average', '100');
  expect(graph).toHaveAttribute('data-06-average', '100');
  expect(graph).toHaveAttribute('data-07-average', '100');
  expect(graph).toHaveAttribute('data-08-average', '100');
  expect(graph).toHaveAttribute('data-09-average', '100');
  expect(graph).toHaveAttribute('data-10-average', '100');
  expect(graph).toHaveAttribute('data-11-average', '100');
  expect(graph).toHaveAttribute('data-12-average', '100');
  expect(graph).toHaveAttribute('data-13-average', '100');
  expect(graph).toHaveAttribute('data-14-average', '100');
  expect(graph).toHaveAttribute('data-15-average', '200');
  expect(graph).toHaveAttribute('data-16-average', '300');
  expect(graph).toHaveAttribute('data-17-average', '300');
  expect(graph).toHaveAttribute('data-18-average', '300');
  expect(graph).toHaveAttribute('data-19-average', '300');
  expect(graph).toHaveAttribute('data-20-average', '300');
  expect(graph).toHaveAttribute('data-21-average', '300');
  expect(graph).toHaveAttribute('data-22-average', '300');
  expect(graph).toHaveAttribute('data-23-average', '300');
  expect(graph).toHaveAttribute('data-24-average', '300');
  expect(graph).toHaveAttribute('data-25-average', '300');
  expect(graph).toHaveAttribute('data-26-average', '300');
  expect(graph).toHaveAttribute('data-27-average', '300');
  expect(graph).toHaveAttribute('data-28-average', '300');
  expect(graph).toHaveAttribute('data-29-average', '300');
  expect(graph).toHaveAttribute('data-30-average', '300');
  expect(graph).toHaveAttribute('data-31-average', '300');
  expect(graph).not.toHaveAttribute('data-01-predicted');
  expect(graph).not.toHaveAttribute('data-02-predicted');
  expect(graph).not.toHaveAttribute('data-03-predicted');
  expect(graph).not.toHaveAttribute('data-04-predicted');
  expect(graph).not.toHaveAttribute('data-05-predicted');
  expect(graph).not.toHaveAttribute('data-06-predicted');
  expect(graph).not.toHaveAttribute('data-07-predicted');
  expect(graph).not.toHaveAttribute('data-08-predicted');
  expect(graph).not.toHaveAttribute('data-09-predicted');
  expect(graph).not.toHaveAttribute('data-10-predicted');
  expect(graph).not.toHaveAttribute('data-11-predicted');
  expect(graph).not.toHaveAttribute('data-12-predicted');
  expect(graph).not.toHaveAttribute('data-13-predicted');
  expect(graph).not.toHaveAttribute('data-14-predicted');
  expect(graph).toHaveAttribute('data-15-predicted', '1200');
  expect(graph).toHaveAttribute('data-16-predicted', '1300');
  expect(graph).toHaveAttribute('data-17-predicted', '1300');
  expect(graph).toHaveAttribute('data-18-predicted', '1300');
  expect(graph).toHaveAttribute('data-19-predicted', '1300');
  expect(graph).toHaveAttribute('data-20-predicted', '1300');
  expect(graph).toHaveAttribute('data-21-predicted', '1300');
  expect(graph).toHaveAttribute('data-22-predicted', '1300');
  expect(graph).toHaveAttribute('data-23-predicted', '1300');
  expect(graph).toHaveAttribute('data-24-predicted', '1300');
  expect(graph).toHaveAttribute('data-25-predicted', '1300');
  expect(graph).toHaveAttribute('data-26-predicted', '1300');
  expect(graph).toHaveAttribute('data-27-predicted', '1300');
  expect(graph).toHaveAttribute('data-28-predicted', '1300');
  expect(graph).toHaveAttribute('data-29-predicted', '1300');
  expect(graph).toHaveAttribute('data-30-predicted', '1300');
  expect(graph).toHaveAttribute('data-31-predicted', '1300');
});

test('renders month from url', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2021-12-31',
      startDate: '2021-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2021-11-01',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2021-11-15',
        }),
        buildTransaction({
          amount: 1200,
          datetime: '2021-11-16',
        }),
      ],
    }),
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-12-01',
      transactions: [
        buildTransaction({
          amount: 600,
          datetime: '2020-01-01',
        }),
        buildTransaction({
          amount: 600,
          datetime: '2020-01-15',
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
  expect(graph).toHaveAttribute('data-01-actual', '600');
  expect(graph).toHaveAttribute('data-02-actual', '600');
  expect(graph).toHaveAttribute('data-03-actual', '600');
  expect(graph).toHaveAttribute('data-04-actual', '600');
  expect(graph).toHaveAttribute('data-05-actual', '600');
  expect(graph).toHaveAttribute('data-06-actual', '600');
  expect(graph).toHaveAttribute('data-07-actual', '600');
  expect(graph).toHaveAttribute('data-08-actual', '600');
  expect(graph).toHaveAttribute('data-09-actual', '600');
  expect(graph).toHaveAttribute('data-10-actual', '600');
  expect(graph).toHaveAttribute('data-11-actual', '600');
  expect(graph).toHaveAttribute('data-12-actual', '600');
  expect(graph).toHaveAttribute('data-13-actual', '600');
  expect(graph).toHaveAttribute('data-14-actual', '600');
  expect(graph).toHaveAttribute('data-15-actual', '1200');
  expect(graph).toHaveAttribute('data-16-actual', '1200');
  expect(graph).toHaveAttribute('data-17-actual', '1200');
  expect(graph).toHaveAttribute('data-18-actual', '1200');
  expect(graph).toHaveAttribute('data-19-actual', '1200');
  expect(graph).toHaveAttribute('data-20-actual', '1200');
  expect(graph).toHaveAttribute('data-21-actual', '1200');
  expect(graph).toHaveAttribute('data-22-actual', '1200');
  expect(graph).toHaveAttribute('data-23-actual', '1200');
  expect(graph).toHaveAttribute('data-24-actual', '1200');
  expect(graph).toHaveAttribute('data-25-actual', '1200');
  expect(graph).toHaveAttribute('data-26-actual', '1200');
  expect(graph).toHaveAttribute('data-27-actual', '1200');
  expect(graph).toHaveAttribute('data-28-actual', '1200');
  expect(graph).toHaveAttribute('data-29-actual', '1200');
  expect(graph).toHaveAttribute('data-30-actual', '1200');
  expect(graph).toHaveAttribute('data-31-actual', '1200');
  expect(graph).toHaveAttribute('data-01-average', '100');
  expect(graph).toHaveAttribute('data-02-average', '100');
  expect(graph).toHaveAttribute('data-03-average', '100');
  expect(graph).toHaveAttribute('data-04-average', '100');
  expect(graph).toHaveAttribute('data-05-average', '100');
  expect(graph).toHaveAttribute('data-06-average', '100');
  expect(graph).toHaveAttribute('data-07-average', '100');
  expect(graph).toHaveAttribute('data-08-average', '100');
  expect(graph).toHaveAttribute('data-09-average', '100');
  expect(graph).toHaveAttribute('data-10-average', '100');
  expect(graph).toHaveAttribute('data-11-average', '100');
  expect(graph).toHaveAttribute('data-12-average', '100');
  expect(graph).toHaveAttribute('data-13-average', '100');
  expect(graph).toHaveAttribute('data-14-average', '100');
  expect(graph).toHaveAttribute('data-15-average', '200');
  expect(graph).toHaveAttribute('data-16-average', '300');
  expect(graph).toHaveAttribute('data-17-average', '300');
  expect(graph).toHaveAttribute('data-18-average', '300');
  expect(graph).toHaveAttribute('data-19-average', '300');
  expect(graph).toHaveAttribute('data-20-average', '300');
  expect(graph).toHaveAttribute('data-21-average', '300');
  expect(graph).toHaveAttribute('data-22-average', '300');
  expect(graph).toHaveAttribute('data-23-average', '300');
  expect(graph).toHaveAttribute('data-24-average', '300');
  expect(graph).toHaveAttribute('data-25-average', '300');
  expect(graph).toHaveAttribute('data-26-average', '300');
  expect(graph).toHaveAttribute('data-27-average', '300');
  expect(graph).toHaveAttribute('data-28-average', '300');
  expect(graph).toHaveAttribute('data-29-average', '300');
  expect(graph).toHaveAttribute('data-30-average', '300');
  expect(graph).toHaveAttribute('data-31-average', '300');
  expect(graph).not.toHaveAttribute('data-01-predicted');
  expect(graph).not.toHaveAttribute('data-02-predicted');
  expect(graph).not.toHaveAttribute('data-03-predicted');
  expect(graph).not.toHaveAttribute('data-04-predicted');
  expect(graph).not.toHaveAttribute('data-05-predicted');
  expect(graph).not.toHaveAttribute('data-06-predicted');
  expect(graph).not.toHaveAttribute('data-07-predicted');
  expect(graph).not.toHaveAttribute('data-08-predicted');
  expect(graph).not.toHaveAttribute('data-09-predicted');
  expect(graph).not.toHaveAttribute('data-10-predicted');
  expect(graph).not.toHaveAttribute('data-11-predicted');
  expect(graph).not.toHaveAttribute('data-12-predicted');
  expect(graph).not.toHaveAttribute('data-13-predicted');
  expect(graph).not.toHaveAttribute('data-14-predicted');
  expect(graph).not.toHaveAttribute('data-15-predicted');
  expect(graph).not.toHaveAttribute('data-16-predicted');
  expect(graph).not.toHaveAttribute('data-17-predicted');
  expect(graph).not.toHaveAttribute('data-18-predicted');
  expect(graph).not.toHaveAttribute('data-19-predicted');
  expect(graph).not.toHaveAttribute('data-20-predicted');
  expect(graph).not.toHaveAttribute('data-21-predicted');
  expect(graph).not.toHaveAttribute('data-22-predicted');
  expect(graph).not.toHaveAttribute('data-23-predicted');
  expect(graph).not.toHaveAttribute('data-24-predicted');
  expect(graph).not.toHaveAttribute('data-25-predicted');
  expect(graph).not.toHaveAttribute('data-26-predicted');
  expect(graph).not.toHaveAttribute('data-27-predicted');
  expect(graph).not.toHaveAttribute('data-28-predicted');
  expect(graph).not.toHaveAttribute('data-29-predicted');
  expect(graph).not.toHaveAttribute('data-30-predicted');
  expect(graph).not.toHaveAttribute('data-31-predicted');
});
