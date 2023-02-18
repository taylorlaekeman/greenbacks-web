import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';

test('shows reauthentication required error when transactions endpoint returns reauthentication required error', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      errors: ['Reauthentication required for a connected account'],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/spending" now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByText(
      /At least one of your accounts needs reauthentication/
    )
  ).toBeInTheDocument();
  expect(
    (await screen.findAllByRole('link', { name: 'Accounts' }))[0]
  ).toBeInTheDocument();
});

test('reauthentication required error link redirects to acounts page', async () => {
  const mocks = [
    buildApiTransactionsMock({
      endDate: '2020-12-31',
      startDate: '2020-01-01',
      errors: ['Reauthentication required for a connected account'],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} route="/spending" now="2021-01-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const link = (await screen.findAllByRole('link', { name: 'Accounts' }))[0];
  userEvent.click(link);
  const pageWrapper = screen.getByTestId('accounts-page');
  expect(pageWrapper).toBeInTheDocument();
});
