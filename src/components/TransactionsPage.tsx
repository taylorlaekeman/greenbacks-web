import React, { FC } from 'react';

import Checkboxes from 'components/Checkboxes';
import Link from 'components/Link';
import Transactions from 'components/Transactions';
import useCategories from 'hooks/useCategories';
import useMonth from 'hooks/useMonth';
import useMultiselect from 'hooks/useMultiselect';
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
  const { earning, isLoading, saving, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const categories = useCategories();
  const {
    earning: earningTags,
    saving: savingTags,
    spending: spendingTags,
  } = getTagsByCategory({ earning, saving, spending });
  const {
    onChange: onChangeVisibleCatagories,
    selectedOptions: visibleCategories,
  } = useMultiselect({
    options: categories,
  });
  const {
    onChange: onChangeVisibleEarningTags,
    selectedOptions: visibleEarningTags,
  } = useMultiselect({
    options: earningTags,
  });
  const {
    onChange: onChangeVisibleSavingTags,
    selectedOptions: visibleSavingTags,
  } = useMultiselect({
    options: savingTags,
  });
  const {
    onChange: onChangeVisibleSpendingTags,
    selectedOptions: visibleSpendingTags,
  } = useMultiselect({
    options: spendingTags,
  });
  const transactions = getVisibleTransactions({
    earning,
    saving,
    spending,
    visibleCategories,
    visibleEarningTags,
    visibleSavingTags,
    visibleSpendingTags,
  });
  if (isLoading) return <p>loading</p>;
  return (
    <>
      <h2>Transactions</h2>
      <p>{readableMonth}</p>
      <Link href={`/transactions/${previousMonth}`}>previous</Link>
      <Link href={`/transactions/${nextMonth}`}>next</Link>
      <Checkboxes
        label="Categories"
        onChange={onChangeVisibleCatagories}
        options={categories}
        selectedOptions={visibleCategories}
      />
      {earningTags.length > 0 &&
        visibleCategories.includes(Category.Earning) && (
          <Checkboxes
            label="Earning Tags"
            onChange={onChangeVisibleEarningTags}
            options={earningTags}
            selectedOptions={visibleEarningTags}
          />
        )}
      {savingTags.length > 0 && visibleCategories.includes(Category.Saving) && (
        <Checkboxes
          label="Saving Tags"
          onChange={onChangeVisibleSavingTags}
          options={savingTags}
          selectedOptions={visibleSavingTags}
        />
      )}
      {spendingTags.length > 0 &&
        visibleCategories.includes(Category.Spending) && (
          <Checkboxes
            label="Spending Tags"
            onChange={onChangeVisibleSpendingTags}
            options={spendingTags}
            selectedOptions={visibleSpendingTags}
          />
        )}
      <Transactions transactions={transactions || []} />
    </>
  );
};

function getVisibleTransactions({
  earning,
  saving,
  spending,
  visibleCategories,
  visibleEarningTags,
  visibleSavingTags,
  visibleSpendingTags,
}: {
  earning?: Transaction[];
  saving?: Transaction[];
  spending?: Transaction[];
  visibleCategories: string[];
  visibleEarningTags: string[];
  visibleSavingTags: string[];
  visibleSpendingTags: string[];
}): Transaction[] {
  const visibleTransactions: Transaction[] = [];
  if (earning && visibleCategories.includes(Category.Earning)) {
    const visibleEarning = earning.filter((transaction) =>
      visibleEarningTags.includes(transaction.tag || 'Untagged')
    );
    visibleTransactions.push(...visibleEarning);
  }
  if (saving && visibleCategories.includes(Category.Saving)) {
    const visibleSaving = saving.filter((transaction) =>
      visibleSavingTags.includes(transaction.tag || 'Untagged')
    );
    visibleTransactions.push(...visibleSaving);
  }
  if (spending && visibleCategories.includes(Category.Spending)) {
    const visibleSpending = spending.filter((transaction) =>
      visibleSpendingTags.includes(transaction.tag || 'Untagged')
    );
    visibleTransactions.push(...visibleSpending);
  }
  return visibleTransactions.sort((first, second) =>
    first.datetime > second.datetime ? -1 : 1
  );
}

function getTagsByCategory({
  earning,
  saving,
  spending,
}: {
  earning?: Transaction[];
  saving?: Transaction[];
  spending?: Transaction[];
}): { earning: string[]; saving: string[]; spending: string[] } {
  const earningTags = getTags(earning);
  const savingTags = getTags(saving);
  const spendingTags = getTags(spending);
  return { earning: earningTags, saving: savingTags, spending: spendingTags };
}

function getTags(transactions: Transaction[] | undefined): string[] {
  if (!transactions) return [];
  return Object.keys(
    transactions.reduce(
      (tags: Record<string, string>, transaction: Transaction) => ({
        ...tags,
        [transaction.tag || 'Untagged']: '',
      }),
      {}
    )
  );
}

export default TransactionsPage;
