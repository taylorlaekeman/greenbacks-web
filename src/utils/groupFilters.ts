import { Filter } from 'types/filter';

export function groupFilters({
  filters,
  groupBy = GroupBy.Tag,
  sortGroupsBy = SortGroupsBy.Key,
  sortGroupsDirection = SortGroupsDirection.Desc,
}: {
  filters?: Filter[];
  groupBy?: GroupBy;
  sortGroupsBy?: SortGroupsBy;
  sortGroupsDirection?: SortGroupsDirection;
}): Group[] | undefined {
  if (!filters) return undefined;
  const filtersByKey = filters.reduce<Record<string, Filter[]>>(
    (result, filter) => {
      const key = getKey(filter, groupBy);
      const existingFilters = result[key] || [];
      return {
        ...result,
        [key]: [...existingFilters, filter],
      };
    },
    {},
  );
  const groupedFilters: Group[] = Object.keys(filtersByKey).map((key) => ({
    filters: filtersByKey[key],
    key,
  }));
  const sortedGroups = groupedFilters.sort((a, b) => {
    const keyA = getGroupSortKey(a, sortGroupsBy);
    const keyB = getGroupSortKey(b, sortGroupsBy);
    const isAGreater = keyA > keyB;
    const isAscending = sortGroupsDirection === SortGroupsDirection.Asc;
    if (isAGreater && isAscending) return 1;
    if (!isAGreater && !isAscending) return 1;
    return -1;
  });
  return sortedGroups;
}

interface Group {
  key: string;
  filters: Filter[];
}

export enum GroupBy {
  Category = 'category',
  Tag = 'tag',
}

export enum SortGroupsBy {
  Count = 'count',
  Key = 'key',
}

export enum SortGroupsDirection {
  Asc = 'ascending',
  Desc = 'descending',
}

function getKey(filter: Filter, groupBy: GroupBy): string {
  switch (groupBy) {
    case GroupBy.Tag:
      return filter.tagToAssign ?? 'Untagged';
    case GroupBy.Category:
    default:
      return filter.categoryToAssign;
  }
}

function getGroupSortKey(
  group: Group,
  sortGroupsBy: SortGroupsBy,
): string | number {
  switch (sortGroupsBy) {
    case SortGroupsBy.Count:
      return group.filters.length;
    case SortGroupsBy.Key:
    default:
      return group.key;
  }
}

export default groupFilters;
