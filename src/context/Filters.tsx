import React, { createContext, FC } from 'react';

import Filter from 'types/filter';

const FiltersContext = createContext<{
  filters: Filter[];
}>({ filters: [] });

export const FiltersProvider: FC<{
  filters?: Filter[];
}> = ({ children, filters = [] }) => (
  <FiltersContext.Provider value={{ filters }}>
    {children}
  </FiltersContext.Provider>
);

export default FiltersContext;
