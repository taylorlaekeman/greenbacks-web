import { useMemo } from 'react';

import useTransactions from 'hooks/useTransactions';
import Transaction, { Category } from 'types/transaction';

const useTransactionsByCategory = ({
  endDate,
  isTestData,
  startDate,
}: {
  endDate: string;
  isTestData?: boolean;
  startDate: string;
}): {
  earning?: Transaction[];
  error?: Error;
  isLoading: boolean;
  saving?: Transaction[];
  spending?: Transaction[];
} => {
  const { credits, debits, error, isLoading } = useTransactions({
    endDate,
    isTestData,
    startDate,
  });
  const { earning, saving, spending } = useMemo(
    () => categorizeTransactions({ credits, debits }),
    [credits, debits]
  );
  return {
    earning,
    error,
    isLoading,
    saving,
    spending,
  };
};

function categorizeTransactions({
  credits,
  debits,
}: {
  credits?: Transaction[];
  debits?: Transaction[];
}): {
  earning?: Transaction[];
  saving?: Transaction[];
  spending?: Transaction[];
} {
  const earning = [
    ...(credits?.filter(({ category }) => category === Category.Earning) || []),
    ...(debits?.filter(({ category }) => category === Category.Earning) || []),
  ];
  const saving = debits?.filter(({ category }) => category === Category.Saving);
  const spending = debits?.filter(
    ({ category }) => category === Category.Spending
  );
  return {
    earning: earning.length > 0 ? earning : undefined,
    saving,
    spending,
  };
}

export default useTransactionsByCategory;
