import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';

test('logs out', () => {
  render(
    <TestGreenbacksProvider isAuthenticated>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const logoutButton = screen.getByRole('button', { name: 'Logout' });
  userEvent.click(logoutButton);
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeInTheDocument();
});
