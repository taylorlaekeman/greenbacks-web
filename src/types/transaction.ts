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
  filteredBy?: string;
  tag?: string;
  type: TransactionType;
}

export interface ConnectedTransaction {
  category: Category;
  firstTransaction?: CoreTransaction;
  id: string;
  secondTransaction?: CoreTransaction;
  tag?: string;
}

export enum Category {
  Earning = 'Earning',
  Hidden = 'Hidden',
  Saving = 'Saving',
  Spending = 'Spending',
}

export enum TransactionType {
  Credit = 'Credit',
  Debit = 'Debit',
  Transfer = 'Transfer',
}

export default Transaction;
