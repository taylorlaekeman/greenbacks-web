import Transaction from 'types/transaction';

import useTransactionsByTag, { UNTAGGED } from 'hooks/useTransactionsByTag';
import type { TagGroup } from 'types/tagGroup';

const useUntaggedTransactions = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  earning?: Transaction[];
  isLoading: boolean;
  spending?: Transaction[];
} => {
  const { earning, isLoading, spending } = useTransactionsByTag({
    endDate,
    startDate,
  });
  const untaggedSpending = groupUntaggedTransactions({ tagGroups: spending });
  const untaggedEarning = groupUntaggedTransactions({ tagGroups: earning });
  return { earning: untaggedEarning, isLoading, spending: untaggedSpending };
};

const groupUntaggedTransactions = ({
  tagGroups,
}: {
  tagGroups?: TagGroup[];
}): Transaction[] | undefined => {
  if (!tagGroups) return undefined;
  const { transactions } =
    tagGroups.find(({ tag }: TagGroup) => tag === UNTAGGED) || {};
  const sortedTransactions = transactions?.sort(
    ({ amount: firstAmount }, { amount: secondAmount }) =>
      firstAmount > secondAmount ? -1 : 1,
  );
  return sortedTransactions;
};

export default useUntaggedTransactions;
