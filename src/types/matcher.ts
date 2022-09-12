import UnfilteredTransaction from 'types/unfilteredTransaction';

interface Matcher {
  comparator?: Comparator;
  expectedValue: string;
  property: keyof UnfilteredTransaction;
}

export enum Comparator {
  Equals = 'equals',
  GreaterThan = 'greater-than',
  LessThan = 'less-than',
}

export default Matcher;
