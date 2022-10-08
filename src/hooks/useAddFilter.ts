import { useContext } from 'react';

import FiltersContext from 'context/Filters';
import type { Filter } from 'types/filter';

const useAddFilter = (): {
  addFilter: (input: { filter: Filter }) => void;
} => {
  const { addFilter } = useContext(FiltersContext);
  return { addFilter };
};

export default useAddFilter;
