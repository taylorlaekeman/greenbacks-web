import useCategorizedTransactions from 'hooks/useCategorizedTransactions';
import type Transaction from 'types/transaction';

const useTransactionsByTag = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { spending: TagGroup[]; isLoading: boolean } => {
  const { earning, isLoading, spending } = useCategorizedTransactions({
    endDate,
    startDate,
  });
  const spendingByTag = groupByTag({
    transactions: [...(spending || []), ...(earning || [])],
  });
  return {
    spending: spendingByTag,
    isLoading,
  };
};

const groupByTag = ({
  transactions = [],
}: {
  transactions?: Transaction[];
} = {}): TagGroup[] => {
  const groupsByTag = transactions.reduce(
    (
      tagGroups: Record<string, TagGroup>,
      transaction
    ): Record<string, TagGroup> => {
      const { amount, tag = UNTAGGED } = transaction;
      const { totalAmount: currentTotal, transactions: existingTransactions } =
        tagGroups[tag] || EMPTY_TAG_GROUP;
      return {
        ...tagGroups,
        [tag]: {
          tag,
          totalAmount: currentTotal + amount,
          transactions: [...existingTransactions, transaction],
        },
      };
    },
    {}
  );
  return Object.values(
    groupsByTag
  ).sort(({ totalAmount: firstAmount }, { totalAmount: secondAmount }) =>
    firstAmount > secondAmount ? -1 : 1
  );
};

export interface TagGroup {
  tag: string;
  totalAmount: number;
  transactions: Transaction[];
}

export const UNTAGGED = 'Untagged';

const EMPTY_TAG_GROUP = {
  totalAmount: 0,
  transactions: [],
};

export default useTransactionsByTag;
