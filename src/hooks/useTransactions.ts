import useFilters from 'hooks/useFilters';
import useQuery, { ApolloError } from 'hooks/useQuery';
import Filter, { Comparator, Matcher } from 'types/filter';
import Transaction, { Category, CoreTransaction } from 'types/transaction';
import gql from 'utils/gql';

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
    data,
    error: transactionsError,
    loading: isLoadingTransactions,
  } = useQuery<
    { transactions: CoreTransaction[] },
    { endDate: string; startDate: string }
  >(GET_TRANSACTIONS_QUERY, {
    variables: { endDate, startDate },
  });
  const { credits, debits } = categorizeTransactions({
    transactions: data?.transactions,
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
    const { categorizedTransaction } = categorizeTransactionWithFilters({
      filters,
      transaction: debit,
    });
    const { category } = categorizedTransaction;
    if (category === Category.Saving) savings.push(categorizedTransaction);
    else expenses.push(categorizedTransaction);
  });
  credits?.forEach((credit) => {
    const { categorizedTransaction } = categorizeTransactionWithFilters({
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
  transactions,
}: {
  transactions?: CoreTransaction[];
} = {}): {
  credits?: CoreTransaction[];
  debits?: CoreTransaction[];
  transfers?: Transfer[];
} => {
  if (!transactions) return {};
  const transfers: Transfer[] = [];
  const debitsToReturn: CoreTransaction[] = [];
  const credits = transactions
    .filter(({ amount }) => amount < 0)
    .map(({ amount, ...rest }) => ({ ...rest, amount: -amount }));
  const debits = transactions.filter(({ amount }) => amount > 0);
  let creditsByAmount = getTransactionsByAmount({ transactions: credits });
  debits.forEach((debit) => {
    const {
      debit: debitToReturn,
      creditsByAmount: newCreditsByAmount,
      transfer,
    } = categorizeTransaction({
      creditsByAmount,
      debit,
    });
    creditsByAmount = newCreditsByAmount;
    if (debitToReturn) debitsToReturn.push(debitToReturn);
    if (transfer) transfers.push(transfer);
  });
  return {
    credits: Object.values(creditsByAmount).flat(),
    debits: debitsToReturn,
    transfers,
  };
};

interface Transfer extends CoreTransaction {
  destinationAccountId: string;
  sourceAccountId: string;
}

const getTransactionsByAmount = ({
  transactions,
}: {
  transactions: CoreTransaction[];
}): Record<number, CoreTransaction[]> =>
  transactions.reduce(
    (
      result: Record<number, CoreTransaction[]>,
      transaction: CoreTransaction
    ) => {
      const { amount } = transaction;
      const existingTransactions = result[amount] || [];
      return {
        ...result,
        [amount]: [...existingTransactions, transaction],
      };
    },
    {}
  );

const categorizeTransaction = ({
  creditsByAmount,
  debit,
}: {
  creditsByAmount: Record<number, CoreTransaction[]>;
  debit: CoreTransaction;
}): {
  creditsByAmount: Record<number, CoreTransaction[]>;
  debit?: CoreTransaction;
  transfer?: Transfer;
} => {
  const { accountId: debitedAccountId, amount, ...rest } = debit;
  if (!(amount in creditsByAmount)) return { creditsByAmount, debit };
  const creditsWithAmount = creditsByAmount[amount];
  const creditIndex = creditsWithAmount.findIndex(
    ({ accountId: creditedAccountId }) => creditedAccountId !== debitedAccountId
  );
  if (creditIndex === -1) return { creditsByAmount, debit };
  const { accountId: creditedAccountId } = creditsWithAmount[creditIndex];
  return {
    creditsByAmount: {
      ...creditsByAmount,
      [amount]: [
        ...creditsWithAmount.slice(0, creditIndex),
        ...creditsWithAmount.slice(creditIndex + 1),
      ],
    },
    transfer: {
      ...rest,
      accountId: 'temp',
      amount,
      destinationAccountId: creditedAccountId,
      sourceAccountId: debitedAccountId,
    },
  };
};

const categorizeTransactionWithFilters = ({
  filters,
  transaction,
}: {
  filters: Filter[];
  transaction: CoreTransaction;
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
