import React from 'react';
import { render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildAccountsQueryMock from '__test__/utils/buildAccountsQueryMock';

test.each(['/', '/spending'])(
  'route %s shows no accounts message when no accounts are connected',
  async (route) => {
    const mocks = [buildAccountsQueryMock()];
    render(
      <TestGreenbacksProvider mocks={mocks} route={route}>
        <Greenbacks />
      </TestGreenbacksProvider>
    );
    expect(await screen.findByTestId('no-accounts-page')).toBeVisible();
  }
);
