import useFilters from 'hooks/useFilters';
import useQuery, { ApolloError } from 'hooks/useQuery';
import Filter, { Comparator, Matcher } from 'types/filter';
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
  // earnings?: Transaction[];
  error?: ApolloError;
  // expenses?: Transaction[];
  isLoading: boolean;
  // savings?: Transaction[];
  transfers?: ConnectedTransaction[];
} => {
  const {
    error: filtersError,
    filters,
    isLoading: isLoadingFilters,
  } = useFilters();
  const { data, error, loading: isLoading } = useQuery<
    { transactions: CoreTransaction[] },
    { endDate: string; startDate: string }
  >(GET_TRANSACTIONS_QUERY, {
    variables: { endDate, startDate },
  });
  const { credits, debits, transfers } = categorizeTransactions({
    filters,
    transactions: data?.transactions,
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
  filters,
  transactions,
}: {
  filters?: Filter[];
  transactions?: CoreTransaction[];
} = {}): {
  credits?: Transaction[];
  debits?: Transaction[];
  transfers?: ConnectedTransaction[];
} => {
  if (!transactions) return {};
  const transfers: ConnectedTransaction[] = [];
  const credits: Transaction[] = [];
  const debits: Transaction[] = [];
  transactions.forEach((coreTransaction) => {
    const { transaction } = applyFilters({
      filters,
      transaction: coreTransaction,
    });
    if (transaction.type === TransactionType.Debit) debits.push(transaction);
    else credits.push(transaction);
  });
  return { credits, debits, transfers };
};

const applyFilters = ({
  filters = [],
  transaction,
}: {
  filters?: Filter[];
  transaction: CoreTransaction;
}): { transaction: Transaction } => {
  const {
    amount: newAmount,
    defaultCategory,
    type,
  } = getAmountTypeAndDefaultCategory({ transaction });
  const matchingFilter = filters.find((filter) =>
    isFilterMatch({ filter, transaction })
  );
  if (!matchingFilter)
    return {
      transaction: {
        ...transaction,
        amount: newAmount,
        category: defaultCategory,
        type,
      },
    };
  const { categoryToAssign, tagToAssign } = matchingFilter;
  return {
    transaction: {
      ...transaction,
      amount: newAmount,
      category: categoryToAssign,
      tag: tagToAssign,
      type,
    },
  };
};

const getAmountTypeAndDefaultCategory = ({
  transaction: { amount },
}: {
  transaction: CoreTransaction;
}): { amount: number; defaultCategory: Category; type: TransactionType } => {
  if (amount >= 0)
    return {
      amount,
      defaultCategory: Category.Spending,
      type: TransactionType.Debit,
    };
  return {
    amount: -amount,
    defaultCategory: Category.Earning,
    type: TransactionType.Credit,
  };
};

const isFilterMatch = ({
  filter: { matchers },
  transaction,
}: {
  filter: Filter;
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
