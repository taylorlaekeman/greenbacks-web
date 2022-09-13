import { Category, CoreTransaction } from 'types/transaction';

interface Filter {
  categoryToAssign: Category;
  id: string;
  matchers: Matcher[];
  tagToAssign?: string;
}

export interface Matcher {
  comparator?: Comparator;
  expectedValue: string;
  property: keyof CoreTransaction;
}

export enum Comparator {
  Equals = 'equals',
  GreaterThan = 'greater-than',
  LessThan = 'less-than',
}

export default Filter;
