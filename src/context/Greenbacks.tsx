import React, { FC } from 'react';

import {
  MockedApiResponse,
  TestGreenbacksApiProvider,
} from 'context/GreenbacksApi';
import { TestNowProvider } from 'context/Now';
import { TestRouteProvider } from 'context/Route';

export const TestGreenbacksProvider: FC<Props> = ({
  children,
  mocks,
  now,
  route,
}) => (
  <TestGreenbacksApiProvider mocks={mocks}>
    <TestNowProvider now={now}>
      <TestRouteProvider route={route}>{children}</TestRouteProvider>
    </TestNowProvider>
  </TestGreenbacksApiProvider>
);

interface Props {
  mocks?: MockedApiResponse[];
  now?: string;
  route?: string;
}

export default undefined;
