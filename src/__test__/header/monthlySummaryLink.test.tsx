import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';

test('header has monthly summary link', async () => {
  render(
    <TestGreenbacksProvider>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(
    await screen.findByRole('link', { name: 'Monthly Summary' })
  ).toBeInTheDocument();
});

test('monthly summary link redirects to monthly summary page', async () => {
  render(
    <TestGreenbacksProvider>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.click(await screen.findByRole('link', { name: 'Monthly Summary' }));
  expect(await screen.findByTestId('monthly-summary-page')).toBeInTheDocument();
});
