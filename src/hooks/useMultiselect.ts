import { useEffect, useMemo, useState } from 'react';

function useMultiselect({
  defaultValue,
  options = [],
}: {
  defaultValue?: (string | Option)[];
  options?: (string | Option)[];
} = {}): {
  onChange: (value: (string | Option)[]) => void;
  onDeselectAll: () => void;
  onSelectAll: () => void;
  onSelectOnly: (value: string) => void;
  onToggle: (value: string) => void;
  selectedOptions: string[];
} {
  const [hasLoadedOptions, setHasLoadedOptions] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<(string | Option)[]>(
    defaultValue || options
  );
  useEffect(() => {
    if (options?.length > 0 && !hasLoadedOptions) {
      setHasLoadedOptions(true);
      setSelectedOptions(defaultValue || options);
    }
  }, [defaultValue, hasLoadedOptions, options, setHasLoadedOptions]);
  const memoizedSelectedOptions = useMemo(
    () =>
      selectedOptions.map((option) =>
        typeof option === 'string' ? option : option.value
      ),
    [selectedOptions]
  );
  return {
    onChange: (newSelectedOptions) => {
      setSelectedOptions(newSelectedOptions);
    },
    onDeselectAll: () => {
      setSelectedOptions([]);
    },
    onSelectAll: () => {
      setSelectedOptions(options);
    },
    onSelectOnly: (value) => {
      setSelectedOptions([value]);
    },
    onToggle: () => {
      /* do nothing */
    },
    selectedOptions: memoizedSelectedOptions,
  };
}

interface Option {
  label: string;
  value: string;
}

export default useMultiselect;
