import useQuery, { ApolloError } from 'hooks/useQuery';
import type { CoreTransaction } from 'types/transaction';
import gql from 'utils/gql';

const useRawTransactions = ({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}): {
  credits?: CoreTransaction[];
  debits?: CoreTransaction[];
  error?: ApolloError;
  isLoading: boolean;
  transfers?: Transfer[];
} => {
  const { data, error, loading: isLoading } = useQuery<
    { transactions: CoreTransaction[] },
    { endDate: string; startDate: string }
  >(GET_TRANSACTIONS_QUERY, {
    variables: { endDate, startDate },
  });
  const { credits, debits, transfers } = categorizeTransactions({
    transactions: data?.transactions,
  });
  return { error, isLoading, credits, debits, transfers };
};

interface Transfer extends CoreTransaction {
  destinationAccountId: string;
  sourceAccountId: string;
}

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

export default useRawTransactions;
