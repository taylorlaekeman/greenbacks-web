import { useContext } from 'react';

import FiltersContext from 'context/Filters';
import { OneTransactionFilter, TwoTransactionFilter } from 'types/filter';

const useAddFilter = (): {
  addFilter: (input: {
    filter: OneTransactionFilter | TwoTransactionFilter;
  }) => void;
} => {
  const { addFilter } = useContext(FiltersContext);
  return { addFilter };
};

export default useAddFilter;
