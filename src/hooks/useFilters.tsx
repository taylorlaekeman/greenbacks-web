import { useContext } from 'react';

import FiltersContext from 'context/Filters';
import type { ApolloError } from 'hooks/useQuery';
import type { Filter } from 'types/filter';

const useFilters = (): {
  error?: ApolloError;
  isLoading: boolean;
  filters?: Filter[];
} => {
  const { filters } = useContext(FiltersContext);
  return {
    isLoading: false,
    filters,
  };
};

export default useFilters;
