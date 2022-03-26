import useTransactions, { Transaction } from 'hooks/useTransactions';

const useExpenses = ({
  endDate,
  startDate,
}: UseExpensesInput): UseExpensesResult => {
  const { isLoading, transactions } = useTransactions({ endDate, startDate });
  const expenses = transactions.filter(({ amount }) => amount > 0);
  return { expenses, isLoading };
};

export interface UseExpensesInput {
  endDate: string;
  startDate: string;
}

export interface UseExpensesResult {
  isLoading: boolean;
  expenses: Transaction[];
}

export default useExpenses;
