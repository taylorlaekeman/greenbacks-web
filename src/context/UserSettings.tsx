import React, { useState } from 'react';

import noop from 'utils/noop';

export interface UserSettings {
  areWidgetsVisible: boolean;
  isTestData: boolean;
}

export interface AllOptionalUserSettings {
  areWidgetsVisible?: boolean;
  isTestData?: boolean;
}

export interface UserSettingCallbacks {
  onChangeTestDataUsage: (input: boolean) => void;
  onChangeWidgetVisibility: (input: boolean) => void;
}

export interface AllOptionalUserSettingCallbacks {
  onChangeTestDataUsage?: (input: boolean) => void;
  onChangeWidgetVisibility?: (input: boolean) => void;
}

export const UserSettingsContext = React.createContext<
  UserSettings & UserSettingCallbacks
>({
  areWidgetsVisible: false,
  isTestData: false,
  onChangeTestDataUsage: noop,
  onChangeWidgetVisibility: noop,
});

export function UserSettingsProvider({
  areWidgetsInitiallyVisible = false,
  children,
}: {
  areWidgetsInitiallyVisible?: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const [areWidgetsVisible, setAreWidgetsVisible] = useState<boolean>(
    areWidgetsInitiallyVisible,
  );
  const [isTestData, setIsTestData] = useState<boolean>(false);
  return (
    <UserSettingsContext.Provider
      value={{
        areWidgetsVisible,
        isTestData,
        onChangeTestDataUsage: setIsTestData,
        onChangeWidgetVisibility: setAreWidgetsVisible,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}

export function TestUserSettingsProvider({
  callbacks: {
    onChangeTestDataUsage = noop,
    onChangeWidgetVisibility = noop,
  } = {},
  children,
  settings: { areWidgetsVisible = false, isTestData = false } = {},
}: {
  callbacks?: AllOptionalUserSettingCallbacks;
  children: React.ReactNode;
  settings?: AllOptionalUserSettings;
}): React.ReactElement {
  return (
    <UserSettingsContext.Provider
      value={{
        areWidgetsVisible,
        isTestData,
        onChangeTestDataUsage,
        onChangeWidgetVisibility,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}
