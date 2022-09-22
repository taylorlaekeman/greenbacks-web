import useFilters from 'hooks/useFilters';
import useQuery, { ApolloError } from 'hooks/useQuery';
import {
  Comparator,
  Matcher,
  OneTransactionFilter,
  TwoTransactionFilter,
} from 'types/filter';
import Transaction, {
  Category,
  ConnectedTransaction,
  CoreTransaction,
  TransactionType,
} from 'types/transaction';
import gql from 'utils/gql';

const useTransactions = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  credits?: Transaction[];
  debits?: Transaction[];
  error?: ApolloError;
  isLoading: boolean;
  transfers?: ConnectedTransaction[];
} => {
  const {
    error: filtersError,
    idFilters = [],
    isLoading: isLoadingFilters,
    oneTransactionFilters = [],
    twoTransactionFilters = [],
  } = useFilters();
  const { data, error, loading: isLoading } = useQuery<
    { transactions: CoreTransaction[] },
    { endDate: string; startDate: string }
  >(GET_TRANSACTIONS_QUERY, {
    variables: { endDate, startDate },
  });
  const { credits, debits, transfers } = categorizeTransactions({
    oneTransactionFilters: [...idFilters, ...oneTransactionFilters],
    transactions: data?.transactions,
    twoTransactionFilters,
  });
  return {
    credits,
    debits,
    error: error || filtersError,
    isLoading: isLoading || isLoadingFilters,
    transfers,
  };
};

export const GET_TRANSACTIONS_QUERY = gql`
  query GetTransactions($startDate: String!, $endDate: String!) {
    transactions(input: { startDate: $startDate, endDate: $endDate }) {
      accountId
      amount
      datetime
      id
      merchant
      name
    }
  }
`;

export const categorizeTransactions = ({
  oneTransactionFilters,
  transactions,
  twoTransactionFilters,
}: {
  oneTransactionFilters?: OneTransactionFilter[];
  transactions?: CoreTransaction[];
  twoTransactionFilters?: TwoTransactionFilter[];
} = {}): {
  credits?: Transaction[];
  debits?: Transaction[];
  transfers?: ConnectedTransaction[];
} => {
  if (!transactions) return {};
  const {
    transactions: transactionsWithoutTransfers,
    transfers,
  } = applyTwoTransactionFilters({
    filters: twoTransactionFilters,
    transactions,
  });
  const { credits, debits } = applyOneTransactionFilters({
    filters: oneTransactionFilters,
    transactions: transactionsWithoutTransfers,
  });
  return { credits, debits, transfers };
};

const applyTwoTransactionFilters = ({
  transactions,
  filters,
}: {
  filters?: TwoTransactionFilter[];
  transactions: CoreTransaction[];
}): {
  transactions: CoreTransaction[];
  transfers?: ConnectedTransaction[];
} => {
  if (!filters) return { transactions };
  const transfers: ConnectedTransaction[] = [];
  let remainingTransactions: CoreTransaction[] = [...transactions];
  filters.forEach((filter) => {
    const {
      categoryToAssign,
      firstMatchers,
      secondMatchers,
      tagToAssign,
    } = filter;
    const {
      matchingTransactions: leftTransactions,
      remainingTransactions: firstFilteredTransactions,
    } = findMatchingTransactions({
      matchers: firstMatchers,
      transactions: remainingTransactions,
    });
    const {
      matchingTransactions: rightTransactions,
      remainingTransactions: secondFilteredTransactions,
    } = findMatchingTransactions({
      matchers: secondMatchers,
      transactions: firstFilteredTransactions,
    });
    const { pairs } = getTransactionPairs({
      categoryToAssign,
      leftTransactions,
      rightTransactions,
      tagToAssign,
    });
    transfers.push(...pairs);
    remainingTransactions = secondFilteredTransactions;
  });
  return { transactions: remainingTransactions, transfers };
};

const findMatchingTransactions = ({
  matchers,
  transactions,
}: {
  matchers: Matcher[];
  transactions: CoreTransaction[];
}): {
  matchingTransactions: CoreTransaction[];
  remainingTransactions: CoreTransaction[];
} => {
  const matchingTransactions: CoreTransaction[] = [];
  const remainingTransactions: CoreTransaction[] = [];
  transactions.forEach((transaction) => {
    const destinationList = isMatchersMatch({ matchers, transaction })
      ? matchingTransactions
      : remainingTransactions;
    destinationList.push(transaction);
  });
  return { matchingTransactions, remainingTransactions };
};

const getTransactionPairs = ({
  categoryToAssign,
  leftTransactions,
  rightTransactions,
  tagToAssign,
}: {
  categoryToAssign: Category;
  leftTransactions: CoreTransaction[];
  rightTransactions: CoreTransaction[];
  tagToAssign?: string;
}): { pairs: ConnectedTransaction[] } => {
  const pairs: ConnectedTransaction[] = [];
  const length = Math.max(leftTransactions.length, rightTransactions.length);
  for (let i = 0; i < length; i += 1) {
    const leftTransaction = leftTransactions[i];
    const rightTransaction = rightTransactions[i];
    pairs.push({
      category: categoryToAssign,
      firstTransaction: leftTransaction,
      id: 'test',
      secondTransaction: rightTransaction,
      tag: tagToAssign,
    });
  }
  return { pairs };
};

const applyOneTransactionFilters = ({
  filters,
  transactions,
}: {
  filters?: OneTransactionFilter[];
  transactions: CoreTransaction[];
}): { credits?: Transaction[]; debits?: Transaction[] } => {
  if (!filters) return {};
  const credits: Transaction[] = [];
  const debits: Transaction[] = [];
  transactions.forEach((coreTransaction) => {
    const transaction = getFullTransaction({ transaction: coreTransaction });
    const destinationList =
      transaction.type === TransactionType.Debit ? debits : credits;
    const matchingFilter = filters.find(({ matchers }) =>
      isMatchersMatch({ matchers, transaction })
    );
    if (!matchingFilter) {
      destinationList.push(transaction);
      return;
    }
    const { categoryToAssign, tagToAssign } = matchingFilter;
    destinationList.push({
      ...transaction,
      category: categoryToAssign,
      tag: tagToAssign,
    });
  });
  return { credits, debits };
};

const getFullTransaction = ({
  transaction,
}: {
  transaction: CoreTransaction;
}): Transaction => {
  const { amount } = transaction;
  if (amount >= 0)
    return {
      ...transaction,
      category: Category.Spending,
      type: TransactionType.Debit,
    };
  return {
    ...transaction,
    amount: -amount,
    category: Category.Earning,
    type: TransactionType.Credit,
  };
};

const isMatchersMatch = ({
  matchers,
  transaction,
}: {
  matchers: Matcher[];
  transaction: CoreTransaction;
}): boolean =>
  matchers.every((matcher: Matcher) =>
    isMatcherMatch({ matcher, transaction })
  );

const isMatcherMatch = ({
  matcher: { comparator = Comparator.Equals, expectedValue, property },
  transaction,
}: {
  matcher: Matcher;
  transaction: CoreTransaction;
}): boolean => {
  switch (comparator) {
    case Comparator.Equals:
      return transaction[property] === expectedValue;
    case Comparator.GreaterThan:
      return transaction[property] > expectedValue;
    case Comparator.LessThan:
      return transaction[property] < expectedValue;
    default:
      return false;
  }
};

export default useTransactions;
