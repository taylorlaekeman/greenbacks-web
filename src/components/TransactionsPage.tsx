import React, { FC } from 'react';

import Checkboxes from 'components/Checkboxes';
import Link from 'components/Link';
import Transactions from 'components/Transactions';
import useCategories from 'hooks/useCategories';
import useMonth from 'hooks/useMonth';
import useMultiselect from 'hooks/useMultiselect';
import useTags from 'hooks/useTags';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction, { Category } from 'types/transaction';

const TransactionsPage: FC = () => {
  const {
    endDate,
    nextMonth,
    previousMonth,
    readable: readableMonth,
    startDate,
  } = useMonth();
  const categories = useCategories();
  const { tags } = useTags();
  const {
    onChange: onChangeSelectedCatagories,
    selectedOptions: selectedCategories,
  } = useMultiselect({
    options: categories,
  });
  const {
    onChange: onChangeSelectedTags,
    selectedOptions: selectedTags,
  } = useMultiselect({
    options: tags,
  });
  const { isLoading, transactions } = useVisibleTransactions({
    endDate,
    selectedCategories,
    selectedTags,
    startDate,
  });
  if (isLoading) return <p>loading</p>;
  return (
    <>
      <h2>Transactions</h2>
      <p>{readableMonth}</p>
      <Link href={`/transactions/${previousMonth}`}>previous</Link>
      <Link href={`/transactions/${nextMonth}`}>next</Link>
      <Checkboxes
        onChange={onChangeSelectedCatagories}
        options={categories}
        selectedOptions={selectedCategories}
      />
      <Checkboxes
        onChange={onChangeSelectedTags}
        options={tags}
        selectedOptions={selectedTags}
      />
      <Transactions transactions={transactions || []} />
    </>
  );
};

const useVisibleTransactions = ({
  endDate,
  selectedCategories,
  startDate,
}: {
  endDate: string;
  selectedCategories: string[];
  selectedTags: string[];
  startDate: string;
}): {
  isLoading: boolean;
  transactions?: Transaction[];
} => {
  const { earning, isLoading, saving, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const transactions: Transaction[] = [];
  if (selectedCategories.includes(Category.Spending))
    transactions.push(...(spending || []));
  if (selectedCategories.includes(Category.Saving))
    transactions.push(...(saving || []));
  if (selectedCategories.includes(Category.Earning))
    transactions.push(...(earning || []));
  const sortedTransactions = transactions.sort((first, second) =>
    first.datetime > second.datetime ? -1 : 1
  );
  return { isLoading, transactions: sortedTransactions };
};

export default TransactionsPage;
