import useFilters from 'hooks/useFilters';
import type { ApolloError } from 'hooks/useQuery';
import useRawTransactions from 'hooks/useRawTransactions';
import Category from 'types/category';
import Filter from 'types/filter';
import Matcher from 'types/matcher';
import Transaction from 'types/transaction';
import UnfilteredTransaction from 'types/unfilteredTransaction';

const useTransactions = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  earnings?: Transaction[];
  error?: ApolloError;
  expenses?: Transaction[];
  isLoading: boolean;
  savings?: Transaction[];
} => {
  const {
    credits,
    debits,
    error: transactionsError,
    isLoading: isLoadingTransactions,
  } = useRawTransactions({
    endDate,
    startDate,
  });
  const {
    error: filtersError,
    filters,
    isLoading: isLoadingFilters,
  } = useFilters();
  const earnings: Transaction[] = [];
  const expenses: Transaction[] = [];
  const savings: Transaction[] = [];
  debits?.forEach((debit) => {
    const { categorizedTransaction } = categorizeTransaction({
      filters,
      transaction: debit,
    });
    const { category } = categorizedTransaction;
    if (category === Category.Saving) savings.push(categorizedTransaction);
    else expenses.push(categorizedTransaction);
  });
  credits?.forEach((credit) => {
    const { categorizedTransaction } = categorizeTransaction({
      filters,
      transaction: credit,
    });
    earnings.push(categorizedTransaction);
  });
  return {
    earnings,
    error: transactionsError || filtersError,
    expenses,
    isLoading: isLoadingTransactions || isLoadingFilters,
    savings,
  };
};

const categorizeTransaction = ({
  filters,
  transaction,
}: {
  filters: Filter[];
  transaction: UnfilteredTransaction;
}): { categorizedTransaction: Transaction } => {
  const matchingFilter = filters.find((filter) =>
    isFilterMatch({ filter, transaction })
  );
  if (!matchingFilter)
    return {
      categorizedTransaction: {
        ...transaction,
        category: Category.Spending,
      },
    };
  const { categoryToAssign, tagToAssign } = matchingFilter;
  return {
    categorizedTransaction: {
      ...transaction,
      category: categoryToAssign,
      tag: tagToAssign,
    },
  };
};

const isFilterMatch = ({
  filter: { matchers },
  transaction,
}: {
  filter: Filter;
  transaction: UnfilteredTransaction;
}): boolean =>
  matchers.every((matcher: Matcher) =>
    isMatcherMatch({ matcher, transaction })
  );

const isMatcherMatch = ({
  matcher: { expectedValue, property },
  transaction,
}: {
  matcher: Matcher;
  transaction: UnfilteredTransaction;
}): boolean => transaction[property] === expectedValue;

export default useTransactions;
