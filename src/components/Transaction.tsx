import React, { FC, useState } from 'react';

import AddFilter from 'components/AddFilter';
import Button from 'components/Button';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import TransactionType from 'types/transaction';

const Transaction: FC<{
  isFilteringEnabled?: boolean;
  transaction: TransactionType;
}> = ({ isFilteringEnabled = false, transaction }) => {
  const { format } = useCurrencyFormatter();
  const [isFilterFormVisible, setIsFilterFormVisible] = useState<boolean>();
  const { amount, datetime, id, merchant, name, type } = transaction;
  return (
    <div>
      <p>
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
      </p>
      {isFilteringEnabled && !isFilterFormVisible && (
        <Button onClick={() => setIsFilterFormVisible(true)}>filter</Button>
      )}
      {isFilterFormVisible && <AddFilter transaction={transaction} />}
    </div>
  );
};

export default Transaction;
