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
import {
  TestUserSettingsProvider,
  AllOptionalUserSettingCallbacks,
  AllOptionalUserSettings,
} from 'context/UserSettings';
import type { Filter, FilterInput } from 'types/filter';

export const TestGreenbacksProvider: FC<Props> = ({
  children,
  filters,
  isApiReady,
  isAuthenticated,
  locales,
  mocks,
  now,
  onAddFilter,
  onUpdateAccountConnection,
  route,
  userSettingCallbacks,
  userSettings,
}) => (
  <TestAuthProvider isAuthenticated={isAuthenticated}>
    <TestGreenbacksApiProvider isReady={isApiReady} mocks={mocks}>
      <TestAccountConnectionProvider
        onUpdateAccountConnection={onUpdateAccountConnection}
      >
        <TestNowProvider now={now}>
          <TestCurrencyLocalesProvider locales={locales}>
            <TestRouteProvider route={route}>
              <TestUserSettingsProvider
                callbacks={userSettingCallbacks}
                settings={userSettings}
              >
                <TestFiltersProvider
                  filters={filters}
                  onAddFilter={onAddFilter}
                >
                  {children}
                </TestFiltersProvider>
              </TestUserSettingsProvider>
            </TestRouteProvider>
          </TestCurrencyLocalesProvider>
        </TestNowProvider>
      </TestAccountConnectionProvider>
    </TestGreenbacksApiProvider>
  </TestAuthProvider>
);

interface Props {
  filters?: Filter[];
  isApiReady?: boolean;
  isAuthenticated?: boolean;
  locales?: string | string[];
  mocks?: MockedApiResponse[];
  now?: string;
  onAddFilter?: (input: { filter: FilterInput }) => void;
  onUpdateAccountConnection?: (input: { token: string }) => void;
  route?: string;
  userSettingCallbacks?: AllOptionalUserSettingCallbacks;
  userSettings?: AllOptionalUserSettings;
}

export default undefined;
