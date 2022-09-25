import { FilterType, Matcher, TwoTransactionFilter } from 'types/filter';
import { Category } from 'types/transaction';

const buildFilter = ({
  categoryToAssign = Category.Spending,
  firstMatchers = [],
  id = 'test-filter-id',
  secondMatchers = [],
  tagToAssign,
}: {
  categoryToAssign?: Category;
  firstMatchers?: Matcher[];
  id?: string;
  secondMatchers?: Matcher[];
  tagToAssign?: string;
}): TwoTransactionFilter => ({
  categoryToAssign,
  firstMatchers,
  id,
  secondMatchers,
  tagToAssign,
  type: FilterType.TwoTransaction,
});

export default buildFilter;
