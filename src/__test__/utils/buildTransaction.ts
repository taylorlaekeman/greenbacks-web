import type { Transaction } from 'hooks/useTransactions';

const buildTransaction = ({
  amount = 100,
  datetime = '2020-01-01',
  merchant = 'merchant',
  name = 'name',
}: {
  amount?: number;
  datetime?: string;
  merchant?: string;
  name?: string;
}): Transaction => ({
  amount,
  datetime,
  merchant,
  name,
});

export default buildTransaction;
