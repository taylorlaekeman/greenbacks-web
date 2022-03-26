import { useContext } from 'react';

import { CurrencyLocalesContext } from 'context/CurrencyLocales';

const useCurrencyFormatter = (): UseCurrencyFormatterResult => {
  const { locales } = useContext(CurrencyLocalesContext);
  return {
    format: ({ currency = 'CAD', value }) => {
      const formatter = Intl.NumberFormat(locales, {
        currency,
        style: 'currency',
      });
      return formatter.format(prepareValue({ currency, value }));
    },
  };
};

const prepareValue = ({
  currency,
  value,
}: {
  currency: string;
  value: number;
}): number => {
  switch (currency) {
    case 'CAD':
    case 'USD': {
      // convert cents to dollars
      return value / 100;
    }
    default: {
      return value;
    }
  }
};

interface UseCurrencyFormatterResult {
  format: Format;
}

type Format = (input: FormatInput) => string;

interface FormatInput {
  currency?: string;
  value: number;
}

export default useCurrencyFormatter;
