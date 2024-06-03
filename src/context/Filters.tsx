import { gql, useMutation, useQuery } from '@apollo/client';
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

const FiltersContext = createContext<{
  addFilter: (input: { filter: Filter }) => void;
  error?: Error;
  filters?: Filter[];
  isAdding: boolean;
  isLoading: boolean;
}>({ addFilter: noop, isAdding: false, isLoading: false });

export const LocalStorageFiltersProvider: FC = ({ children }) => {
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
        isAdding: false,
        isLoading: false,
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

export const MemoryFiltersProvider: FC<{
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
        isAdding: false,
        isLoading: false,
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

export function TestFiltersProvider({
  children,
  filters = [],
  onAddFilter = noop,
}: {
  children: React.ReactNode;
  filters?: Filter[];
  onAddFilter?: (input: { filter: Filter }) => void;
}): React.ReactElement {
  return (
    <FiltersContext.Provider
      value={{
        addFilter: onAddFilter,
        filters,
        isAdding: false,
        isLoading: false,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function ApiFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const response = useQuery(FILTERS_QUERY);
  const { error, data, loading: isLoadingFilters } = response;
  const [mutate, status] = useMutation(ADD_FILTER_MUTATION, {
    refetchQueries: ['GetFilters'],
  });
  const { loading: isAdding } = status;
  return (
    <FiltersContext.Provider
      value={{
        addFilter: ({ filter }) => mutate({ variables: filter }),
        error,
        filters: data?.filters || [],
        isAdding,
        isLoading: isLoadingFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export const FILTERS_QUERY = gql`
  query GetFilters {
    filters {
      categoryToAssign
      id
      matchers {
        comparator
        expectedValue
        property
      }
      tagToAssign
    }
  }
`;

export const ADD_FILTER_MUTATION = gql`
  mutation AddFilter(
    $categoryToAssign: Category!
    $matchers: [MatcherInput]!
    $tagToAssign: String
  ) {
    addFilter(
      input: {
        categoryToAssign: $categoryToAssign
        matchers: $matchers
        tagToAssign: $tagToAssign
      }
    ) {
      categoryToAssign
      id
      matchers {
        comparator
        expectedValue
        property
      }
      tagToAssign
    }
  }
`;

export default FiltersContext;
