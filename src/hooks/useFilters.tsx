import { useContext } from 'react';

import FiltersContext from 'context/Filters';
import type { Filter } from 'types/filter';

const useFilters = (): {
  error?: Error;
  isLoading: boolean;
  filters?: Filter[];
} => {
  const { error, filters, isLoading } = useContext(FiltersContext);
  return {
    error,
    isLoading,
    filters,
  };
};

export default useFilters;
