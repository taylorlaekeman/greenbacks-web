import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import useMonthlyTotal, { MonthlyTotalHookInput } from 'hooks/useMonthlyTotal';
import type { Transaction } from 'hooks/useTransactions';
import datetime from 'utils/datetime';

const getMock = (result: Transaction[] = []): jest.Mock => {
  const mock = jest.fn();
  mock.mockReturnValue(result);
  return mock;
};

const Component = ({ input }: Props) => {
  const total = useMonthlyTotal(input);
  return <div aria-label="result">{total}</div>;
};

interface Props {
  input: MonthlyTotalHookInput;
}

describe('useMonthlyTotal', () => {
  test('defaults to current month', () => {
    const mock = getMock();
    const input = {
      useTransactions: mock,
    };
    render(<Component input={input} />);
    const now = datetime.now();
    const args = mock.mock.calls[0][0];
    expect(args.startDate).toBe(now.startOf('month').toString());
    expect(args.endDate).toBe(now.endOf('month').toString());
  });

  test.each([
    ['2020-01', '2020-01-01T00:00:00.000', '2020-01-31T23:59:59.999'],
    ['2021-02', '2021-02-01T00:00:00.000', '2021-02-28T23:59:59.999'],
  ])(
    'uses correct dates for month %s',
    (month, expectedStartDate, expectedEndDate) => {
      const mock = getMock();
      const input = {
        month,
        useTransactions: mock,
      };
      render(<Component input={input} />);
      const args = mock.mock.calls[0][0];
      expect(args.startDate.slice(0, -6)).toBe(expectedStartDate);
      expect(args.endDate.slice(0, -6)).toBe(expectedEndDate);
    }
  );

  test('correctly sums transactions', () => {
    const mock = getMock([
      { amount: 1, date: 'test', name: 'test' },
      { amount: 2, date: 'test', name: 'test' },
      { amount: 3, date: 'test', name: 'test' },
    ]);
    const input = {
      useTransactions: mock,
    };
    render(<Component input={input} />);
    const element = screen.getByRole('generic', { name: 'result' });
    expect(element).toHaveTextContent('6');
  });
});
