import React, { FunctionComponent } from 'react';

const TotalSpending: FunctionComponent<Props> = ({ amount, month }: Props) => {
  const [_, monthNumber] = month.split('-');
  return (
    <article aria-label="total-spending">
      <p data-testid="total-spending-amount">{`$${amount}`}</p>
      <p data-testid="total-spending-month">
        {`Spent in ${monthNamesByNumber[monthNumber]}, 2020`}
      </p>
    </article>
  );
};

interface Props {
  amount?: number;
  month: string;
}

TotalSpending.defaultProps = {
  amount: 0,
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
