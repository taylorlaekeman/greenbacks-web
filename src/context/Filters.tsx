import React, { createContext, FC } from 'react';

import Filter from 'types/filter';

const FiltersContext = createContext<{
  filters: Filter[];
  idFilters: Filter[];
}>({ filters: [], idFilters: [] });

export const FiltersProvider: FC<{
  filters?: Filter[];
  idFilters?: Filter[];
}> = ({ children, filters = [], idFilters = [] }) => (
  <FiltersContext.Provider value={{ filters, idFilters }}>
    {children}
  </FiltersContext.Provider>
);

export default FiltersContext;
