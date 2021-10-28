import React, { FunctionComponent } from 'react';

import datetime from 'utils/datetime';

const now = datetime.now();
const defaultCurrentMonth = `${now.year}-${now.month}`;

const TotalSpending: FunctionComponent<Props> = ({
  amount,
  currentMonth = defaultCurrentMonth,
  month,
}: Props) => (
  <article aria-label="total-spending">
    <p data-testid="total-spending-amount">{`$${amount}`}</p>
    <p data-testid="total-spending-month">
      {generateMonthText({ currentMonth, month })}
    </p>
  </article>
);

interface Props {
  amount?: number;
  currentMonth?: string;
  month: string;
}

TotalSpending.defaultProps = {
  amount: 0,
  currentMonth: defaultCurrentMonth,
};

const generateMonthText = ({
  currentMonth,
  month,
}: {
  currentMonth: string;
  month: string;
}) => {
  const [year, monthNumber] = month.split('-');
  const [currentYear, _] = currentMonth.split('-');
  if (currentYear === year)
    return `Spent in ${monthNamesByNumber[monthNumber]}`;
  return `Spent in ${monthNamesByNumber[monthNumber]}, ${year}`;
};

const monthNamesByNumber: Record<string, string> = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

export default TotalSpending;
