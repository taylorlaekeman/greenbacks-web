import React, { FC, useState } from 'react';

import MonthSelector from 'components/MonthSelector';
import Select from 'components/Select';
import Transactions from 'components/Transactions';
import TransactionSelector from 'components/TransactionSelector';
import useMonth from 'hooks/useMonth';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction from 'types/transaction';
import { GroupBy, SortGroupsBy } from 'utils/groupTransactions';

const TransactionsPage: FC = () => {
  const { endDate, startDate } = useMonth();
  const { earning, isLoading, saving, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const [groupBy, setGroupBy] = useState<GroupBy>(GroupBy.Date);
  const [visibleTransactions, setVisibleTransactions] = useState<
    Transaction[]
  >();
  if (isLoading) return <p>loading</p>;
  return (
    <>
      <h2>Transactions</h2>
      <MonthSelector />
      <TransactionSelector
        earning={earning}
        onChangeVisibleTransactions={setVisibleTransactions}
        saving={saving}
        spending={spending}
      />
      <Select
        id="group-by"
        onChange={(newGroupBy) => {
          setGroupBy(GroupBy[newGroupBy as keyof typeof GroupBy]);
        }}
        options={Object.values(GroupBy).map((option) => option.toString())}
        value={groupBy.toString()}
      />
      <Transactions
        groupBy={groupBy}
        sortGroupsBy={
          groupBy === GroupBy.Date ? SortGroupsBy.Key : SortGroupsBy.Total
        }
        transactions={visibleTransactions || []}
      />
    </>
  );
};

export default TransactionsPage;
