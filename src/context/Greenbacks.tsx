import React, { FC } from 'react';

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
  mocks,
  now,
  route,
}) => (
  <TestGreenbacksApiProvider mocks={mocks}>
    <TestNowProvider now={now}>
      <TestCurrencyLocalesProvider locales={locales}>
        <TestRouteProvider route={route}>{children}</TestRouteProvider>
      </TestCurrencyLocalesProvider>
    </TestNowProvider>
  </TestGreenbacksApiProvider>
);

interface Props {
  locales?: string | string[];
  mocks?: MockedApiResponse[];
  now?: string;
  route?: string;
}

export default undefined;
