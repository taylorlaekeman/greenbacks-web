import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';

test('shows reauthentication required error when transactions endpoint returns reauthentication required error', async () => {
  const mocks = [
    buildApiTransactionsMock({
      errors: ['Reauthentication required for a connected account'],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const text = await screen.findByText(
    /At least one of your accounts needs reauthentication/
  );
  const link = screen.getByRole('link');
  expect(text).toBeInTheDocument();
  expect(link).toBeInTheDocument();
});

test('reauthentication required error link redirects to acounts page', async () => {
  const mocks = [
    buildApiTransactionsMock({
      errors: ['Reauthentication required for a connected account'],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const link = await screen.findByRole('link');
  userEvent.click(link);
  const pageWrapper = screen.getByTestId('accounts-page');
  expect(pageWrapper).toBeInTheDocument();
});
