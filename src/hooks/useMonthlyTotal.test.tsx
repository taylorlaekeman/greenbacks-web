import React from 'react';
import { render } from '@testing-library/react';

import useMonthlyTotal, { MonthlyTotalHookInput } from 'hooks/useMonthlyTotal';
import datetime from 'utils/datetime';

const getMock = () => {
  const mock = jest.fn();
  mock.mockReturnValue([]);
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
});
