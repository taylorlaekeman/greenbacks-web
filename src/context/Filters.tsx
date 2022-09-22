import React, { createContext, FC } from 'react';

import { OneTransactionFilter, TwoTransactionFilter } from 'types/filter';

export interface AllFilters {
  idFilters?: OneTransactionFilter[];
  oneTransactionFilters?: OneTransactionFilter[];
  twoTransactionFilters?: TwoTransactionFilter[];
}

const getAllFilters = ({
  filters = [],
  idFilters = [],
}: {
  filters?: OneTransactionFilter[] | AllFilters;
  idFilters?: OneTransactionFilter[];
} = {}): AllFilters => {
  if (Array.isArray(filters))
    return {
      idFilters,
      oneTransactionFilters: filters,
      twoTransactionFilters: [],
    };
  return filters;
};

const FiltersContext = createContext<AllFilters>(getAllFilters());

export const FiltersProvider: FC<{
  filters?: OneTransactionFilter[] | AllFilters;
  idFilters?: OneTransactionFilter[];
}> = ({ children, filters, idFilters }) => {
  const allFilters = getAllFilters({ filters, idFilters });
  return (
    <FiltersContext.Provider value={allFilters}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContext;
