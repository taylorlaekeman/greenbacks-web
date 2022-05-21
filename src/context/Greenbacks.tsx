import React, { FC } from 'react';

import { TestAuthProvider } from 'context/Auth';
import { TestCurrencyLocalesProvider } from 'context/CurrencyLocales';
import {
  MockedApiResponse,
  TestGreenbacksApiProvider,
} from 'context/GreenbacksApi';
import { TestNowProvider } from 'context/Now';
import { TestRouteProvider } from 'context/Route';

export const TestGreenbacksProvider: FC<Props> = ({
  children,
  locales,
  logout,
  mocks,
  now,
  route,
}) => (
  <TestAuthProvider logout={logout}>
    <TestGreenbacksApiProvider mocks={mocks}>
      <TestNowProvider now={now}>
        <TestCurrencyLocalesProvider locales={locales}>
          <TestRouteProvider route={route}>{children}</TestRouteProvider>
        </TestCurrencyLocalesProvider>
      </TestNowProvider>
    </TestGreenbacksApiProvider>
  </TestAuthProvider>
);

interface Props {
  locales?: string | string[];
  logout?: () => void;
  mocks?: MockedApiResponse[];
  now?: string;
  route?: string;
}

export default undefined;
