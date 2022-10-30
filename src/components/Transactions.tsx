import React, { FC } from 'react';

import Transaction from 'components/Transaction';
import TransactionType from 'types/transaction';

const Transactions: FC<{ transactions: TransactionType[] }> = ({
  transactions,
}) => (
  <ul>
    {transactions.map((transaction) => (
      <li key={transaction.id}>
        <Transaction isFilteringEnabled transaction={transaction} />
      </li>
    ))}
  </ul>
);

export default Transactions;
