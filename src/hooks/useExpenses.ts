import type { ApolloError } from 'hooks/useQuery';
import useTransactions, { Transaction } from 'hooks/useTransactions';

const useExpenses = ({
  endDate,
  startDate,
}: UseExpensesInput): UseExpensesResult => {
  const { error, isLoading, transactions } = useTransactions({
    endDate,
    startDate,
  });
  const expenses = transactions?.filter(({ amount }) => amount > 0);
  return { error, expenses, isLoading };
};

export interface UseExpensesInput {
  endDate: string;
  startDate: string;
}

export interface UseExpensesResult {
  error?: ApolloError;
  expenses?: Transaction[];
  isLoading: boolean;
}

export default useExpenses;
