import React, { createContext, FC } from 'react';

export const CurrencyLocalesContext = createContext<{
  locales?: string | string[];
}>({
  locales: undefined,
});

const CurrencyLocalesProvider: FC = ({ children }) => (
  <CurrencyLocalesContext.Provider value={{ locales: undefined }}>
    {children}
  </CurrencyLocalesContext.Provider>
);

export const TestCurrencyLocalesProvider: FC<TestProviderProps> = ({
  children,
  locales = 'en-CA',
}) => (
  <CurrencyLocalesContext.Provider value={{ locales }}>
    {children}
  </CurrencyLocalesContext.Provider>
);

interface TestProviderProps {
  locales?: string | string[];
}

export default CurrencyLocalesProvider;
