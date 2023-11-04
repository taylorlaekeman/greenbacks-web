import uuid from 'utils/uuid';
import Transaction, {
  Category,
  CoreTransaction,
  TransactionType,
} from 'types/transaction';

export function buildTransaction({
  accountId = 'accountId',
  amount = 100,
  category = Category.Spending,
  datetime = '2020-01-01',
  filteredBy,
  id = uuid(),
  merchant = 'merchant',
  name = 'name',
  tag,
  type = TransactionType.Debit,
}: {
  accountId?: string;
  amount?: number;
  category?: Category;
  datetime?: string;
  filteredBy?: string;
  id?: string;
  merchant?: string;
  name?: string;
  tag?: string;
  type?: TransactionType;
} = {}): Transaction {
  return {
    accountId,
    amount,
    category,
    datetime,
    filteredBy,
    id,
    merchant,
    name,
    tag,
    type,
  };
}

const buildCoreTransaction = ({
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

export default buildCoreTransaction;
