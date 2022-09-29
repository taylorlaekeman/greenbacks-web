import type Transaction from 'types/transaction';

export interface TagGroup {
  tag: string;
  totalAmount: number;
  transactions: Transaction[];
}

export default TagGroup;
