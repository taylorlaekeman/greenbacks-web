import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import type TagGroup from 'types/tagGroup';
import type Transaction from 'types/transaction';
import groupTransactionsByMonth from 'utils/groupTransactionsByMonth';
import groupTransactionsByTag from 'utils/groupTransactionsByTag';

const useTransactionsByMonthAndTag = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  earning?: MonthTagGroup[];
  isLoading: boolean;
  saving?: MonthTagGroup[];
  spending?: MonthTagGroup[];
} => {
  const { earning, isLoading, saving, spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  return {
    earning: groupTransactionsByMonthAndTag({ transactions: earning }),
    isLoading,
    saving: groupTransactionsByMonthAndTag({ transactions: saving }),
    spending: groupTransactionsByMonthAndTag({ transactions: spending }),
  };
};

export interface MonthTagGroup {
  month: string;
  tags: TagGroup[];
}

const groupTransactionsByMonthAndTag = ({
  transactions: allTransactions,
}: {
  transactions?: Transaction[];
}): MonthTagGroup[] | undefined => {
  if (!allTransactions) return undefined;
  const transactionsByMonth = groupTransactionsByMonth({
    transactions: allTransactions,
  });
  return transactionsByMonth?.map(({ month, transactions }) => {
    const tags = groupTransactionsByTag({ transactions });
    return { month, tags };
  });
};

export default useTransactionsByMonthAndTag;
