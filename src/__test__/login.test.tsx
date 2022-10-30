import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';

test('logs in and shows home page', () => {
  render(
    <TestGreenbacksProvider isAuthenticated={false}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const button = screen.getByRole('button', { name: 'Login' });
  userEvent.click(button);
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
});
