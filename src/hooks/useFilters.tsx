import { useContext } from 'react';

import FiltersContext from 'context/Filters';
import type { ApolloError } from 'hooks/useQuery';
import Filter from 'types/filter';

const useFilters = (): {
  error?: ApolloError;
  filters: Filter[];
  isLoading: boolean;
} => {
  const { filters, idFilters } = useContext(FiltersContext);
  return { filters: [...idFilters, ...filters], isLoading: false };
};

export default useFilters;
