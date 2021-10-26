import React, { FunctionComponent } from 'react';

const TotalSpending: FunctionComponent<Props> = ({ amount }: Props) => (
  <p data-testid="total-spending-amount">{`$${amount}`}</p>
);

interface Props {
  amount?: number;
}

TotalSpending.defaultProps = {
  amount: 0,
};

export default TotalSpending;
