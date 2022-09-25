import React, { FC } from 'react';

import { TestAccountConnectionProvider } from 'context/AccountConnection';
import { TestAuthProvider } from 'context/Auth';
import { TestCurrencyLocalesProvider } from 'context/CurrencyLocales';
import { TestFiltersProvider } from 'context/Filters';
import {
  MockedApiResponse,
  TestGreenbacksApiProvider,
} from 'context/GreenbacksApi';
import { TestNowProvider } from 'context/Now';
import { TestRouteProvider } from 'context/Route';
import { OneTransactionFilter, TwoTransactionFilter } from 'types/filter';

export const TestGreenbacksProvider: FC<Props> = ({
  children,
  idFilters,
  isApiReady,
  isAuthenticated,
  locales,
  mocks,
  now,
  oneTransactionFilters,
  onUpdateAccountConnection,
  route,
  twoTransactionFilters,
}) => (
  <TestAuthProvider isAuthenticated={isAuthenticated}>
    <TestGreenbacksApiProvider isReady={isApiReady} mocks={mocks}>
      <TestAccountConnectionProvider
        onUpdateAccountConnection={onUpdateAccountConnection}
      >
        <TestNowProvider now={now}>
          <TestCurrencyLocalesProvider locales={locales}>
            <TestRouteProvider route={route}>
              <TestFiltersProvider
                idFilters={idFilters}
                oneTransactionFilters={oneTransactionFilters}
                twoTransactionFilters={twoTransactionFilters}
              >
                {children}
              </TestFiltersProvider>
            </TestRouteProvider>
          </TestCurrencyLocalesProvider>
        </TestNowProvider>
      </TestAccountConnectionProvider>
    </TestGreenbacksApiProvider>
  </TestAuthProvider>
);

interface Props {
  idFilters?: OneTransactionFilter[];
  isApiReady?: boolean;
  isAuthenticated?: boolean;
  locales?: string | string[];
  mocks?: MockedApiResponse[];
  now?: string;
  oneTransactionFilters?: OneTransactionFilter[];
  onUpdateAccountConnection?: (input: { token: string }) => void;
  route?: string;
  twoTransactionFilters?: TwoTransactionFilter[];
}

export default undefined;
