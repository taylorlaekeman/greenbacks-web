import { Filter } from 'types/filter';

function groupTransactions({
  filters,
}: {
  filters?: Filter[];
}): Group[] | undefined {
  if (!filters) return undefined;
  const filtersByKey = filters.reduce<Record<string, Filter[]>>(
    (result, filter) => {
      const key = getKey(filter);
      const existingFilters = result[key] || [];
      return {
        ...result,
        [key]: [...existingFilters, filter],
      };
    },
    {}
  );
  return Object.keys(filtersByKey).map((key) => ({
    filters: filtersByKey[key],
    key,
  }));
}

interface Group {
  key: string;
  filters: Filter[];
}

function getKey(filter: Filter): string {
  return filter.categoryToAssign;
}

export default groupTransactions;
