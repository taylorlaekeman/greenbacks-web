import Category from 'types/category';
import UnfilteredTransaction from 'types/unfilteredTransaction';

interface Transaction extends UnfilteredTransaction {
  category: Category;
  tag?: string;
}

export default Transaction;
