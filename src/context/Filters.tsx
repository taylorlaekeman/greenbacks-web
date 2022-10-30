import React, {
  createContext,
  FC,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { Filter } from 'types/filter';
import noop from 'utils/noop';

export interface AllFilters {
  idFilters?: Filter[];
  filters?: Filter[];
}

const FiltersContext = createContext<{
  addFilter: (input: { filter: Filter }) => void;
  filters?: Filter[];
}>({ addFilter: noop });

export const FiltersProvider: FC = ({ children }) => {
  const {
    idFilters: initialIdFilters = [],
    filters: initialFilters = [],
  } = getFiltersFromStorage();
  const { addFilter, filters } = useFilters({
    initialIdFilters,
    initialFilters,
  });
  useEffect(() => {
    localStorage.setItem(
      'filters',
      JSON.stringify({
        filters,
      })
    );
  }, [filters]);
  return (
    <FiltersContext.Provider
      value={{
        addFilter,
        filters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

const getFiltersFromStorage = (): {
  idFilters: Filter[];
  filters: Filter[];
} => {
  const serializedFilters = localStorage.getItem('filters');
  if (!serializedFilters)
    return {
      idFilters: [],
      filters: [],
    };
  const { idFilters = [], filters = [] } = JSON.parse(serializedFilters);
  return {
    idFilters,
    filters,
  };
};

export const TestFiltersProvider: FC<{
  idFilters?: Filter[];
  filters?: Filter[];
}> = ({
  children,
  idFilters: initialIdFilters = [],
  filters: initialFilters = [],
}) => {
  const { addFilter, filters } = useFilters({
    initialIdFilters,
    initialFilters,
  });
  return (
    <FiltersContext.Provider
      value={{
        addFilter,
        filters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

const useFilters = ({
  initialIdFilters,
  initialFilters,
}: {
  initialIdFilters: Filter[];
  initialFilters: Filter[];
}): {
  addFilter: (input: { filter: Filter }) => void;
  filters: Filter[];
} => {
  const [{ idFilters, filters }, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    {
      idFilters: initialIdFilters,
      filters: initialFilters,
    }
  );
  const addFilter = useCallback(
    ({ filter }) => {
      dispatch({
        payload: { filter },
        type: ActionType.AddFilter,
      });
    },
    [dispatch]
  );
  const allFilters = useMemo(() => [...idFilters, ...filters], [
    idFilters,
    filters,
  ]);
  return {
    addFilter,
    filters: allFilters,
  };
};

interface State {
  idFilters: Filter[];
  filters: Filter[];
}

type Action = AddFilterAction;

enum ActionType {
  AddFilter = 'addFilter',
}

interface AddFilterAction {
  payload: AddFilterPayload;
  type: ActionType.AddFilter;
}

interface AddFilterPayload {
  filter: Filter;
}

const reducer: Reducer<State, Action> = (state, { payload, type }) => {
  switch (type) {
    case ActionType.AddFilter:
      return handleAddFilterAction({ payload, state });
    default:
      return state;
  }
};

const handleAddFilterAction = ({
  payload: { filter },
  state,
}: {
  payload: AddFilterPayload;
  state: State;
}): State => {
  const { idFilters, filters } = state;
  const isIdFilter = filter.matchers.some(({ property }) => property === 'id');
  const newIdFilters = isIdFilter ? [...idFilters, filter] : idFilters;
  const newFilters = !isIdFilter ? [...filters, filter] : filters;
  return {
    ...state,
    idFilters: newIdFilters,
    filters: newFilters,
  };
};

export default FiltersContext;
