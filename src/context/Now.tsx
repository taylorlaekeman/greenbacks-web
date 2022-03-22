import React, { createContext, FC } from 'react';

import datetime from 'utils/datetime';

export const NowContext = createContext({ now: datetime.now });

const NowProvider: FC = ({ children }) => (
  <NowContext.Provider value={{ now: datetime.now }}>
    {children}
  </NowContext.Provider>
);

export const TestNowProvider: FC<TestProviderProps> = ({
  children,
  now = '2020-01-01',
}) => (
  <NowContext.Provider value={{ now: () => datetime.fromISO(now) }}>
    {children}
  </NowContext.Provider>
);

interface TestProviderProps {
  now?: string;
}

export default NowProvider;
