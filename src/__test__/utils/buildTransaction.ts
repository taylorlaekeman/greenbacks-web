import uuid from 'utils/uuid';
import Transaction from 'types/unfilteredTransaction';

const buildTransaction = ({
  accountId = 'accountId',
  amount = 100,
  datetime = '2020-01-01',
  id = uuid(),
  merchant = 'merchant',
  name = 'name',
}: {
  accountId?: string;
  amount?: number;
  datetime?: string;
  id?: string;
  merchant?: string;
  name?: string;
} = {}): Transaction => ({
  accountId,
  amount,
  datetime,
  id,
  merchant,
  name,
});

export default buildTransaction;
