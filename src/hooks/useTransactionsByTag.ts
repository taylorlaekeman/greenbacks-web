import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import type TagGroup from 'types/tagGroup';
import type Transaction from 'types/transaction';

const useTransactionsByTag = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { earning: TagGroup[]; isLoading: boolean; spending: TagGroup[] } => {
  const { earning, isLoading, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const earningByTag = groupByTag({
    transactions: earning,
  });
  const spendingByTag = groupByTag({
    transactions: spending,
  });
  return {
    earning: earningByTag,
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

export const UNTAGGED = 'Untagged';

const EMPTY_TAG_GROUP = {
  totalAmount: 0,
  transactions: [],
};

export default useTransactionsByTag;
