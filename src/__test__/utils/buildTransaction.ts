import type { Transaction } from 'hooks/useTransactions';
import uuid from 'utils/uuid';

const buildTransaction = ({
  amount = 100,
  datetime = '2020-01-01',
  id = uuid(),
  merchant = 'merchant',
  name = 'name',
}: {
  amount?: number;
  datetime?: string;
  id?: string;
  merchant?: string;
  name?: string;
}): Transaction => ({
  amount,
  datetime,
  id,
  merchant,
  name,
});

export default buildTransaction;
