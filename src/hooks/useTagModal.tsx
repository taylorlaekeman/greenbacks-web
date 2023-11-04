import { useContext } from 'react';

import TagModalContext, { ITagModal } from 'context/TagModal';

function useTagModal(): ITagModal {
  return useContext(TagModalContext);
}

export default useTagModal;
