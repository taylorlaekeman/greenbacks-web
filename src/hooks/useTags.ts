import useFilters from 'hooks/useFilters';
import { GroupBy, groupFilters, SortGroupsBy } from 'utils/groupFilters';

const useTags = (): {
  isLoading: boolean;
  tags?: string[];
} => {
  const { filters, isLoading } = useFilters();
  const groupedFilters = groupFilters({
    filters,
    groupBy: GroupBy.Tag,
    sortGroupsBy: SortGroupsBy.Count,
  });
  const tags = groupedFilters
    ?.map((group) => group.key)
    .filter((tag) => tag !== 'Untagged');
  return {
    isLoading,
    tags,
  };
};

export enum SortBy {
  FilterCount = 'filterCount',
  Name = 'name',
}

export enum SortDirection {
  Asc = 'ascending',
  Desc = 'descending',
}

export default useTags;
