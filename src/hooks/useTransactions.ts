import useFilters from 'hooks/useFilters';
import useQuery, { ApolloError } from 'hooks/useQuery';
import { Comparator, Filter, Matcher } from 'types/filter';
import Transaction, {
  Category,
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
} => {
  const {
    error: filtersError,
    isLoading: isLoadingFilters,
    filters = [],
  } = useFilters();
  const { data, error, loading: isLoading } = useQuery<
    { transactions: CoreTransaction[] },
    { endDate: string; startDate: string }
  >(GET_TRANSACTIONS_QUERY, {
    variables: { endDate, startDate },
  });
  const { credits, debits } = categorizeTransactions({
    filters,
    transactions: data?.transactions,
  });
  return {
    credits,
    debits,
    error: error || filtersError,
    isLoading: isLoading || isLoadingFilters,
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
} => {
  if (!transactions) return {};
  const { credits, debits } = applyFilters({
    filters,
    transactions,
  });
  return { credits, debits };
};

const applyFilters = ({
  filters,
  transactions,
}: {
  filters?: Filter[];
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
    const { categoryToAssign, id, tagToAssign } = matchingFilter;
    destinationList.push({
      ...transaction,
      category: categoryToAssign,
      filteredBy: id,
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
}): boolean => {
  if (matchers.length === 0) return false;
  return matchers.every((matcher: Matcher) =>
    isMatcherMatch({ matcher, transaction })
  );
};

const isMatcherMatch = ({
  matcher: { comparator = Comparator.Equals, expectedValue, property },
  transaction,
}: {
  matcher: Matcher;
  transaction: CoreTransaction;
}): boolean => {
  if (!(property in transaction)) return false;
  const actualValue = transaction[property as keyof CoreTransaction];
  switch (comparator) {
    case Comparator.Equals:
      return actualValue === expectedValue;
    case Comparator.GreaterThan:
      return actualValue > expectedValue;
    case Comparator.LessThan:
      return actualValue < expectedValue;
    default:
      return false;
  }
};

export default useTransactions;
