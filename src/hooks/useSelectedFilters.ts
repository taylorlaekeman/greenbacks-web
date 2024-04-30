import useMultiselect from 'hooks/useMultiselect';
import type { Category } from 'types/transaction';

export function useSelectedFilters({
  selectableCategories,
  selectableEarningTags,
  selectableSavingTags,
  selectableSpendingTags,
}: {
  selectableCategories?: Category[];
  selectableEarningTags?: string[];
  selectableSavingTags?: string[];
  selectableSpendingTags?: string[];
} = {}): Result {
  const {
    onChange: onChangeSelectedCategories,
    selectedOptions: selectedCategories,
  } = useMultiselect({
    options: selectableCategories,
  });
  const {
    onChange: onChangeSelectedEarningTags,
    selectedOptions: selectedEarningTags,
  } = useMultiselect({
    options: selectableEarningTags,
  });
  const {
    onChange: onChangeSelectedSavingTags,
    selectedOptions: selectedSavingTags,
  } = useMultiselect({
    options: selectableSavingTags,
  });
  const {
    onChange: onChangeSelectedSpendingTags,
    selectedOptions: selectedSpendingTags,
  } = useMultiselect({
    options: selectableSpendingTags,
  });
  return {
    onChangeSelectedCategories,
    onChangeSelectedEarningTags,
    onChangeSelectedSavingTags,
    onChangeSelectedSpendingTags,
    selectedCategories: selectedCategories as Category[],
    selectedEarningTags,
    selectedSavingTags,
    selectedSpendingTags,
  };
}

interface Result extends SelectedFilters {
  onChangeSelectedCategories: (categories: string[]) => void;
  onChangeSelectedEarningTags: (tags: string[]) => void;
  onChangeSelectedSavingTags: (tags: string[]) => void;
  onChangeSelectedSpendingTags: (tags: string[]) => void;
}

export interface SelectedFilters {
  selectedCategories: Category[];
  selectedEarningTags: string[];
  selectedSavingTags: string[];
  selectedSpendingTags: string[];
}

export default useSelectedFilters;
