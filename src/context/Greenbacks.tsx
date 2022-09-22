import React, { FC } from 'react';

import { TestAccountConnectionProvider } from 'context/AccountConnection';
import { TestAuthProvider } from 'context/Auth';
import { TestCurrencyLocalesProvider } from 'context/CurrencyLocales';
import { AllFilters, FiltersProvider } from 'context/Filters';
import {
  MockedApiResponse,
  TestGreenbacksApiProvider,
} from 'context/GreenbacksApi';
import { TestNowProvider } from 'context/Now';
import { TestRouteProvider } from 'context/Route';
import { OneTransactionFilter as Filter } from 'types/filter';

export const TestGreenbacksProvider: FC<Props> = ({
  children,
  filters,
  idFilters,
  isApiReady,
  isAuthenticated,
  locales,
  mocks,
  now,
  onUpdateAccountConnection,
  route,
}) => (
  <TestAuthProvider isAuthenticated={isAuthenticated}>
    <TestGreenbacksApiProvider isReady={isApiReady} mocks={mocks}>
      <TestAccountConnectionProvider
        onUpdateAccountConnection={onUpdateAccountConnection}
      >
        <TestNowProvider now={now}>
          <TestCurrencyLocalesProvider locales={locales}>
            <TestRouteProvider route={route}>
              <FiltersProvider filters={filters} idFilters={idFilters}>
                {children}
              </FiltersProvider>
            </TestRouteProvider>
          </TestCurrencyLocalesProvider>
        </TestNowProvider>
      </TestAccountConnectionProvider>
    </TestGreenbacksApiProvider>
  </TestAuthProvider>
);

interface Props {
  filters?: AllFilters | Filter[];
  idFilters?: Filter[];
  isApiReady?: boolean;
  isAuthenticated?: boolean;
  locales?: string | string[];
  mocks?: MockedApiResponse[];
  now?: string;
  onUpdateAccountConnection?: (input: { token: string }) => void;
  route?: string;
}

export default undefined;
