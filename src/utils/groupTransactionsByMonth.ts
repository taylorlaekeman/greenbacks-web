import type Transaction from 'types/transaction';

const groupTransactionsByMonth = ({
  transactions: allTransactions,
}: {
  transactions?: Transaction[];
}): TransactionsByMonth[] | undefined => {
  if (!allTransactions) return undefined;
  const transactionsByMonth = allTransactions.reduce(
    (result: Record<string, Transaction[]>, transaction) => {
      const { datetime } = transaction;
      const [year, month] = datetime.split('-');
      const yearAndMonth = `${year}-${month}`;
      const existingTransactions = result[yearAndMonth] || [];
      return {
        ...result,
        [yearAndMonth]: [...existingTransactions, transaction],
      };
    },
    {}
  );
  return Object.entries(transactionsByMonth).map(([month, transactions]) => ({
    month,
    transactions,
  }));
};

interface TransactionsByMonth {
  month: string;
  transactions: Transaction[];
}

export default groupTransactionsByMonth;
