import React, { FunctionComponent } from 'react';

const TotalSpending: FunctionComponent<Props> = ({ amount }: Props) => (
  <article aria-label="total-spending">
    <p data-testid="total-spending-amount">{`$${amount}`}</p>
    <p data-testid="total-spending-month">Spent this month</p>
  </article>
);

interface Props {
  amount?: number;
}

TotalSpending.defaultProps = {
  amount: 0,
};

export default TotalSpending;
