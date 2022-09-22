import { Category, CoreTransaction } from 'types/transaction';

export interface CoreFilter {
  categoryToAssign: Category;
  id: string;
  tagToAssign?: string;
}

export interface OneTransactionFilter extends CoreFilter {
  matchers: MatcherGroup;
}

export interface TwoTransactionFilter extends CoreFilter {
  firstMatchers: MatcherGroup;
  secondMatchers: MatcherGroup;
}

export type MatcherGroup = Matcher[];

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
