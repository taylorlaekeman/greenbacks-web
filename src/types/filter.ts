import { Category } from 'types/transaction';

export interface CoreFilter {
  categoryToAssign: Category;
  id: string;
  tagToAssign?: string;
  type: FilterType;
}

export interface OneTransactionFilter extends CoreFilter {
  matchers: MatcherGroup;
  type: FilterType.Id | FilterType.OneTransaction;
}

export interface TwoTransactionFilter extends CoreFilter {
  firstMatchers: MatcherGroup;
  secondMatchers: MatcherGroup;
  type: FilterType.TwoTransaction;
}

export enum FilterType {
  Id = 'Id',
  OneTransaction = 'OneTransaction',
  TwoTransaction = 'TwoTransaction',
}

export type MatcherGroup = Matcher[];

export interface Matcher {
  comparator?: Comparator;
  expectedValue: string;
  property: string;
}

export enum Comparator {
  Equals = 'equals',
  GreaterThan = 'greater-than',
  LessThan = 'less-than',
}
