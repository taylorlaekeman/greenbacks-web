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
}

export interface ConnectedTransaction {
  category: Category;
  id: string;
  tag?: string;
  transactions: CoreTransaction[];
}

export enum Category {
  Saving = 'Saving',
  Spending = 'Spending',
}

export default Transaction;
