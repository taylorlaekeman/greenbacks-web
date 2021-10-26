import React, { FunctionComponent } from 'react';

const TotalSpending: FunctionComponent<Props> = ({ amount }: Props) => (
  <p data-testid="total-spending-amount">{`$${amount}`}</p>
);

interface Props {
  amount: number;
}

export default TotalSpending;
