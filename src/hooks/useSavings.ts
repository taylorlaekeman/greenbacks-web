import useFilters from 'hooks/useFilters';
import type { ApolloError } from 'hooks/useQuery';
import useTransactions from 'hooks/useTransactions';
import Category from 'types/category';
import Filter from 'types/filter';
import Matcher from 'types/matcher';
import Transaction from 'types/transaction';
import UnfilteredTransaction from 'types/unfilteredTransaction';

const useSavings = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  error?: ApolloError;
  isLoading: boolean;
  savings?: UnfilteredTransaction[];
} => {
  const { debits, error, isLoading: isLoadingTransactions } = useTransactions({
    endDate,
    startDate,
  });
  const { filters, isLoading: isLoadingFilters } = useFilters();
  const categorizedDebits = debits?.map((debit) => {
    const { categorizedTransaction } = categorizeTransaction({
      filters,
      transaction: debit,
    });
    return categorizedTransaction;
  });
  const savings = categorizedDebits?.filter(
    ({ category }) => category === Category.Saving
  );
  return {
    error,
    isLoading: isLoadingFilters || isLoadingTransactions,
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
        category: Category.Uncategorized,
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

export default useSavings;
