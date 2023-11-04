import { Category } from 'types/transaction';

const useCategories = ({
  isHiddenIncluded = false,
}: { isHiddenIncluded?: boolean } = {}): Category[] => {
  if (isHiddenIncluded) return CATEGORIES_WITH_HIDDEN;
  return CATEGORIES;
};

const CATEGORIES = [Category.Earning, Category.Saving, Category.Spending];

const CATEGORIES_WITH_HIDDEN = [...CATEGORIES, Category.Hidden];

export default useCategories;
