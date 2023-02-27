import React, { createContext, FC } from 'react';

import useTagsByCategory from 'hooks/useTagsByCategory';
import noop from 'utils/noop';

export interface ITagSelectionContext {
  deselect: () => void;
  select: () => void;
  selectedTags: string[];
  tags: string[];
}

const defaultContext = {
  deselect: noop,
  select: noop,
  selectedTags: [],
  tags: [],
};

const TagSelectionContext = createContext<ITagSelectionContext>(defaultContext);

export const TagSelectionProvider: FC = ({ children }) => {
  const { isLoading, spending: spendingTags } = useTagsByCategory();
  if (isLoading)
    return (
      <TagSelectionContext.Provider value={defaultContext}>
        {children}
      </TagSelectionContext.Provider>
    );
  return (
    <TagSelectionContext.Provider
      value={{
        deselect: noop,
        select: noop,
        selectedTags: spendingTags || [],
        tags: spendingTags || [],
      }}
    >
      {children}
    </TagSelectionContext.Provider>
  );
};

export default TagSelectionContext;
