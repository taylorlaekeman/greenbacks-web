import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import type TagGroup from 'types/tagGroup';
import groupTransactionsByTag from 'utils/groupTransactionsByTag';

export { UNTAGGED } from 'utils/groupTransactionsByTag';

const useTransactionsByTag = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  earning: TagGroup[];
  isLoading: boolean;
  saving: TagGroup[];
  spending: TagGroup[];
} => {
  const { earning, isLoading, saving, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  const earningByTag = groupTransactionsByTag({
    transactions: earning,
  });
  const savingByTag = groupTransactionsByTag({
    transactions: saving,
  });
  const spendingByTag = groupTransactionsByTag({
    transactions: spending,
  });
  return {
    earning: earningByTag,
    isLoading,
    saving: savingByTag,
    spending: spendingByTag,
  };
};

export default useTransactionsByTag;
