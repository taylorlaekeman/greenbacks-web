import useFilters from 'hooks/useFilters';
import { Category } from 'types/transaction';

const useTagsByCategory = (): {
  isLoading: boolean;
  earning?: string[];
  saving?: string[];
  spending?: string[];
} => {
  const uniqueEarningTags: Record<string, string> = {};
  const uniqueSavingTags: Record<string, string> = {};
  const uniqueSpendingTags: Record<string, string> = {};
  const { filters, isLoading } = useFilters();
  filters?.forEach(({ categoryToAssign, tagToAssign }) => {
    if (!tagToAssign) return;
    if (categoryToAssign === Category.Earning)
      uniqueEarningTags[tagToAssign] = tagToAssign;
    if (categoryToAssign === Category.Saving)
      uniqueSavingTags[tagToAssign] = tagToAssign;
    if (categoryToAssign === Category.Spending)
      uniqueSpendingTags[tagToAssign] = tagToAssign;
  });
  return {
    earning: Object.keys(uniqueEarningTags),
    isLoading,
    saving: Object.keys(uniqueSavingTags),
    spending: Object.keys(uniqueSpendingTags),
  };
};

export default useTagsByCategory;
