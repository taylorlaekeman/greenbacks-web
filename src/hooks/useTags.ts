import useFilters from 'hooks/useFilters';

const useTags = (): { isLoading: boolean; tags?: string[] } => {
  const uniqueTags: Record<string, string> = {};
  const { idFilters, isLoading, oneTransactionFilters } = useFilters();
  idFilters?.forEach(({ tagToAssign }) => {
    if (tagToAssign) uniqueTags[tagToAssign] = tagToAssign;
  });
  oneTransactionFilters?.forEach(({ tagToAssign }) => {
    if (tagToAssign) uniqueTags[tagToAssign] = tagToAssign;
  });
  const tags = Object.keys(uniqueTags);
  if (tags.length === 0) return { isLoading };
  return {
    isLoading,
    tags,
  };
};

export default useTags;
