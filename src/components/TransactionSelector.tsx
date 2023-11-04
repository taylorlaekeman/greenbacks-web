import React, { FC, useEffect, useMemo } from 'react';

import Checkboxes from 'components/Checkboxes';
import useCategories from 'hooks/useCategories';
import useMultiselect from 'hooks/useMultiselect';
import Transaction, { Category } from 'types/transaction';
import noop from 'utils/noop';

const TransactionSelector: FC<{
  earning?: Transaction[];
  onChangeVisibleTransactions?: (transactions: Transaction[]) => void;
  saving?: Transaction[];
  spending?: Transaction[];
}> = ({ earning, onChangeVisibleTransactions = noop, saving, spending }) => {
  const categories = useCategories();
  const {
    onChange: onChangeVisibleCategories,
    selectedOptions: visibleCategories,
  } = useMultiselect({
    options: categories,
  });
  const earningTags = getTags(earning);
  const savingTags = getTags(saving);
  const spendingTags = getTags(spending);
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
  const visibleTransactions = useMemo(
    () =>
      getVisibleTransactions({
        earning,
        saving,
        spending,
        visibleCategories,
        visibleEarningTags,
        visibleSavingTags,
        visibleSpendingTags,
      }),
    [
      earning,
      saving,
      spending,
      visibleCategories,
      visibleEarningTags,
      visibleSavingTags,
      visibleSpendingTags,
    ]
  );
  useEffect(() => {
    onChangeVisibleTransactions(visibleTransactions);
  }, [onChangeVisibleTransactions, visibleTransactions]);
  return (
    <>
      <Checkboxes
        label="Categories"
        onChange={onChangeVisibleCategories}
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
    </>
  );
};

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
  ).sort();
}

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

export default TransactionSelector;
