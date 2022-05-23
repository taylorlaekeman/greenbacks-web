import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';

test('logout button calls auth provider logout', () => {
  const logout = jest.fn();
  render(
    <TestGreenbacksProvider logout={logout}>
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const button = screen.getByRole('button', { name: 'Logout' });
  userEvent.click(button);
  expect(logout).toHaveBeenCalled();
});
