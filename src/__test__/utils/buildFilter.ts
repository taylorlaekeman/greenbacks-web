import {
  Comparator,
  FilterType,
  Matcher,
  OneTransactionFilter,
} from 'types/filter';
import { Category, CoreTransaction } from 'types/transaction';

const buildFilter = ({
  categoryToAssign = Category.Spending,
  id = 'test-filter-id',
  matchers = [],
  tagToAssign,
}: {
  categoryToAssign?: Category;
  id?: string;
  matchers?: Matcher[];
  tagToAssign?: string;
}): OneTransactionFilter => ({
  categoryToAssign,
  id,
  matchers,
  tagToAssign,
  type: FilterType.OneTransaction,
});

export const buildMatcher = ({
  comparator,
  expectedValue = 'test-expected-value',
  property = 'name',
}: {
  comparator?: Comparator;
  expectedValue: string;
  property: keyof CoreTransaction;
}): Matcher => ({
  comparator,
  expectedValue,
  property,
});

export default buildFilter;
