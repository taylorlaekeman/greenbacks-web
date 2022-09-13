import uuid from 'utils/uuid';
import { CoreTransaction } from 'types/transaction';

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
} = {}): CoreTransaction => ({
  accountId,
  amount,
  datetime,
  id,
  merchant,
  name,
});

export default buildTransaction;
