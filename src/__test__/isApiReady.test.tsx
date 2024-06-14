import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';

test('shows loading indicator when api is not ready', () => {
  render(
    <TestGreenbacksProvider isApiReady={false}>
      <Greenbacks />
    </TestGreenbacksProvider>,
  );
  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
});
