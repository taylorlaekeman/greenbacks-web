import Transaction from 'types/transaction';

import useTransactionsByTag, { UNTAGGED } from 'hooks/useTransactionsByTag';
import type { TagGroup } from 'types/tagGroup';

const useUntaggedTransactions = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): { isLoading: boolean; untaggedTransactions?: Transaction[] } => {
  const { isLoading, spending } = useTransactionsByTag({ endDate, startDate });
  const { transactions } =
    spending.find(({ tag }: TagGroup) => tag === UNTAGGED) || {};
  const sortedTransactions = transactions?.sort(
    ({ amount: firstAmount }, { amount: secondAmount }) =>
      firstAmount > secondAmount ? -1 : 1
  );
  return { isLoading, untaggedTransactions: sortedTransactions };
};

export default useUntaggedTransactions;
