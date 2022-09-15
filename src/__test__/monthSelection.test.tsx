import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';

test('shows month from route', async () => {
  render(
    <TestGreenbacksProvider route="/months/2020-01/" now="2020-02">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(await screen.findByText('January 2020')).toBeVisible();
});

test('shows current month when no month is present in route', async () => {
  render(
    <TestGreenbacksProvider now="2020-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  expect(await screen.findByText('January 2020')).toBeVisible();
});

test('goes to previous month', async () => {
  render(
    <TestGreenbacksProvider route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.click(
    await screen.findByRole('link', { name: 'Go to previous month' })
  );
  expect(await screen.findByText('December 2019')).toBeVisible();
});

test('goes to next month', async () => {
  render(
    <TestGreenbacksProvider route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.click(
    await screen.findByRole('link', { name: 'Go to next month' })
  );
  expect(await screen.findByText('February 2020')).toBeVisible();
});
