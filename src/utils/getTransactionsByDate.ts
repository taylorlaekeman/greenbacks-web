import Transaction from 'types/transaction';

const getTransactionsByDate = ({
  transactions,
}: {
  transactions?: Transaction[];
}): { date: string; transactions: Transaction[] }[] => {
  if (!transactions) return [];
  const transactionsByDay = transactions.reduce(
    (result: Record<string, Transaction[]>, transaction: Transaction) => {
      const { datetime } = transaction;
      const existingTransactions = result[datetime] || [];
      return {
        ...result,
        [datetime]: [...existingTransactions, transaction],
      };
    },
    {}
  );
  return Object.entries(transactionsByDay)
    .map(([date, dailyTransactions]) => ({
      date,
      transactions: dailyTransactions,
    }))
    .sort(({ date: firstDate }, { date: secondDate }) =>
      firstDate > secondDate ? -1 : 1
    );
};

export default getTransactionsByDate;
