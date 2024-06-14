import { useContext } from 'react';

import TagSelectionContext, {
  ITagSelectionContext,
} from 'context/TagSelection';

const useSelectedTags = (): {
  deselect: () => void;
  select: () => void;
  selectedTags: string[];
  tags: string[];
} => {
  const { deselect, select, selectedTags, tags } =
    useContext<ITagSelectionContext>(TagSelectionContext);
  return { deselect, select, selectedTags, tags };
};

export default useSelectedTags;
