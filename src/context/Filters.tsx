import React, {
  createContext,
  FC,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

import {
  FilterType,
  OneTransactionFilter,
  TwoTransactionFilter,
} from 'types/filter';
import noop from 'utils/noop';

export interface AllFilters {
  idFilters?: OneTransactionFilter[];
  oneTransactionFilters?: OneTransactionFilter[];
  twoTransactionFilters?: TwoTransactionFilter[];
}

const FiltersContext = createContext<{
  addFilter: (input: {
    filter: OneTransactionFilter | TwoTransactionFilter;
  }) => void;
  idFilters?: OneTransactionFilter[];
  oneTransactionFilters?: OneTransactionFilter[];
  twoTransactionFilters?: TwoTransactionFilter[];
}>({ addFilter: noop });

export const FiltersProvider: FC = ({ children }) => {
  const {
    idFilters: initialIdFilters = [],
    oneTransactionFilters: initialOneTransactionFilters = [],
    twoTransactionFilters: initialTwoTransactionFilters = [],
  } = getFiltersFromStorage();
  const {
    addFilter,
    idFilters,
    oneTransactionFilters,
    twoTransactionFilters,
  } = useFilters({
    initialIdFilters,
    initialOneTransactionFilters,
    initialTwoTransactionFilters,
  });
  useEffect(() => {
    localStorage.setItem(
      'filters',
      JSON.stringify({
        idFilters,
        oneTransactionFilters,
        twoTransactionFilters,
      })
    );
  }, [idFilters, oneTransactionFilters, twoTransactionFilters]);
  return (
    <FiltersContext.Provider
      value={{
        addFilter,
        idFilters,
        oneTransactionFilters,
        twoTransactionFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

const getFiltersFromStorage = (): {
  idFilters: OneTransactionFilter[];
  oneTransactionFilters: OneTransactionFilter[];
  twoTransactionFilters: TwoTransactionFilter[];
} => {
  const serializedFilters = localStorage.getItem('filters');
  if (!serializedFilters)
    return {
      idFilters: [],
      oneTransactionFilters: [],
      twoTransactionFilters: [],
    };
  const {
    idFilters = [],
    oneTransactionFilters = [],
    twoTransactionFilters = [],
  } = JSON.parse(serializedFilters);
  return {
    idFilters,
    oneTransactionFilters,
    twoTransactionFilters,
  };
};

export const TestFiltersProvider: FC<{
  idFilters?: OneTransactionFilter[];
  oneTransactionFilters?: OneTransactionFilter[];
  twoTransactionFilters?: TwoTransactionFilter[];
}> = ({
  children,
  idFilters: initialIdFilters = [],
  oneTransactionFilters: initialOneTransactionFilters = [],
  twoTransactionFilters: initialTwoTransactionFilters = [],
}) => {
  const {
    addFilter,
    idFilters,
    oneTransactionFilters,
    twoTransactionFilters,
  } = useFilters({
    initialIdFilters,
    initialOneTransactionFilters,
    initialTwoTransactionFilters,
  });
  return (
    <FiltersContext.Provider
      value={{
        addFilter,
        idFilters,
        oneTransactionFilters,
        twoTransactionFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

const useFilters = ({
  initialIdFilters,
  initialOneTransactionFilters,
  initialTwoTransactionFilters,
}: {
  initialIdFilters: OneTransactionFilter[];
  initialOneTransactionFilters: OneTransactionFilter[];
  initialTwoTransactionFilters: TwoTransactionFilter[];
}): {
  addFilter: (input: {
    filter: OneTransactionFilter | TwoTransactionFilter;
  }) => void;
  idFilters: OneTransactionFilter[];
  oneTransactionFilters: OneTransactionFilter[];
  twoTransactionFilters: TwoTransactionFilter[];
} => {
  const [
    { idFilters, oneTransactionFilters, twoTransactionFilters },
    dispatch,
  ] = useReducer<Reducer<State, Action>>(reducer, {
    idFilters: initialIdFilters,
    oneTransactionFilters: initialOneTransactionFilters,
    twoTransactionFilters: initialTwoTransactionFilters,
  });
  const addFilter = useCallback(
    ({ filter }) => {
      dispatch({
        payload: { filter },
        type: ActionType.AddFilter,
      });
    },
    [dispatch]
  );
  return {
    addFilter,
    idFilters,
    oneTransactionFilters,
    twoTransactionFilters,
  };
};

interface State {
  idFilters: OneTransactionFilter[];
  oneTransactionFilters: OneTransactionFilter[];
  twoTransactionFilters: TwoTransactionFilter[];
}

type Action = AddFilterAction;

interface AddFilterAction {
  payload: AddFilterPayload;
  type: ActionType.AddFilter;
}

interface AddFilterPayload {
  filter: OneTransactionFilter | TwoTransactionFilter;
}

const reducer: Reducer<State, Action> = (state, { payload, type }) => {
  switch (type) {
    case ActionType.AddFilter:
      return handleAddFilterAction({ payload, state });
    default:
      return state;
  }
};

enum ActionType {
  AddFilter = 'addFilter',
}

const handleAddFilterAction = ({
  payload: { filter },
  state,
}: {
  payload: AddFilterPayload;
  state: State;
}): State => {
  const { idFilters, oneTransactionFilters } = state;
  const newIdFilters =
    filter.type === FilterType.Id ? [...idFilters, filter] : idFilters;
  const newOneTransactionFilters =
    filter.type === FilterType.OneTransaction
      ? [...oneTransactionFilters, filter]
      : oneTransactionFilters;
  return {
    ...state,
    idFilters: newIdFilters,
    oneTransactionFilters: newOneTransactionFilters,
  };
};

export default FiltersContext;
