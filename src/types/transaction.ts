export interface CoreTransaction {
  accountId: string;
  amount: number;
  datetime: string;
  id: string;
  merchant: string;
  name: string;
}

interface Transaction extends CoreTransaction {
  category: Category;
  tag?: string;
  type: TransactionType;
}

export interface ConnectedTransaction {
  category: Category;
  id: string;
  tag?: string;
  transactions: CoreTransaction[];
}

export enum Category {
  Earning = 'Earning',
  Saving = 'Saving',
  Spending = 'Spending',
}

export enum TransactionType {
  Credit = 'Credit',
  Debit = 'Debit',
}

export default Transaction;
