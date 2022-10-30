import useFilters from 'hooks/useFilters';

const useTags = (): { isLoading: boolean; tags?: string[] } => {
  const uniqueTags: Record<string, string> = {};
  const { filters, isLoading } = useFilters();
  filters?.forEach(({ tagToAssign }) => {
    if (tagToAssign) uniqueTags[tagToAssign] = tagToAssign;
  });
  const tags = Object.keys(uniqueTags).sort();
  if (tags.length === 0) return { isLoading };
  return {
    isLoading,
    tags,
  };
};

export default useTags;
