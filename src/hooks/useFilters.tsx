import { useContext } from 'react';

import FiltersContext from 'context/Filters';
import type { ApolloError } from 'hooks/useQuery';
import { OneTransactionFilter, TwoTransactionFilter } from 'types/filter';

const useFilters = (): {
  error?: ApolloError;
  idFilters?: OneTransactionFilter[];
  isLoading: boolean;
  oneTransactionFilters?: OneTransactionFilter[];
  twoTransactionFilters?: TwoTransactionFilter[];
} => {
  const {
    idFilters,
    oneTransactionFilters,
    twoTransactionFilters,
  } = useContext(FiltersContext);
  return {
    idFilters,
    isLoading: false,
    oneTransactionFilters,
    twoTransactionFilters,
  };
};

export default useFilters;
