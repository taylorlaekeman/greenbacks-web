import Category from 'types/category';
import Matcher from 'types/matcher';

interface Filter {
  categoryToAssign: Category;
  id: string;
  matchers: Matcher[];
  tagToAssign?: string;
}

export default Filter;
