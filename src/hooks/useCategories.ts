import { Category } from 'types/transaction';

const useCategories = ({
  isHiddenIncluded = false,
}: { isHiddenIncluded?: boolean } = {}): Category[] => {
  const categories = [Category.Earning, Category.Saving, Category.Spending];
  if (isHiddenIncluded) categories.push(Category.Hidden);
  return categories;
};

export default useCategories;
