import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';

test('shows average total monthly spending', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 1200,
          datetime: '2020-01-01',
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider
      mocks={apiMocks}
      now="2021-01-01"
      route="/monthly-summary"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText('Average monthly spending: $1.00')
  ).toBeVisible();
});
