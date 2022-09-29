import React, { FC } from 'react';

import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import Transaction from 'types/transaction';

const Transactions: FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  const { format } = useCurrencyFormatter();
  return (
    <ul>
      {transactions.map(({ amount, datetime, id, merchant, name, type }) => (
        <li key={id}>
          {format({ value: amount })}
          &nbsp;&#40;
          {type}
          &#41;&mdash;
          {merchant}
          &nbsp;&#40;
          {name}
          &#41;&mdash;
          {datetime}
          &nbsp;
          {id}
        </li>
      ))}
    </ul>
  );
};

export default Transactions;
