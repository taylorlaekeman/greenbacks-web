import React, { FunctionComponent } from 'react';

import datetime from 'utils/datetime';

const now = datetime.now();
const defaultCurrentMonth = `${now.year}-${now.month}`;

const TotalSpending: FunctionComponent<Props> = ({
  amount,
  currentMonth = defaultCurrentMonth,
  month = defaultCurrentMonth,
}: Props) => (
  <article aria-label="total-spending">
    <p data-testid="total-spending-amount">{`$${amount}`}</p>
    <p data-testid="total-spending-text">
      {generateMonthText({ currentMonth, month })}
    </p>
  </article>
);

interface Props {
  amount?: number;
  currentMonth?: string;
  month?: string;
}

TotalSpending.defaultProps = {
  amount: 0,
  currentMonth: defaultCurrentMonth,
  month: defaultCurrentMonth,
};

const generateMonthText = ({
  currentMonth,
  month,
}: {
  currentMonth: string;
  month: string;
}) => {
  const [year, monthNumber] = month.split('-');
  const [currentYear, currentMonthNumber] = currentMonth.split('-');
  if (currentYear === year && currentMonthNumber === monthNumber)
    return 'Spent so far this month';
  const monthName = monthNamesByNumber[monthNumber];
  if (currentYear === year) return `Spent in ${monthName}`;
  return `Spent in ${monthName}, ${year}`;
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
