import { useEffect, useState } from 'react';

function useMultiselect({
  options = [],
}: { options?: (string | Option)[] } = {}): {
  onChange: (value: (string | Option)[]) => void;
  onDeselectAll: () => void;
  onSelectAll: () => void;
  onSelectOnly: (value: string) => void;
  onToggle: (value: string) => void;
  selectedOptions: string[];
} {
  const [hasLoadedOptions, setHasLoadedOptions] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<(string | Option)[]>(
    []
  );
  useEffect(() => {
    if (options?.length > 0 && !hasLoadedOptions) {
      setHasLoadedOptions(true);
      setSelectedOptions(options);
    }
  }, [hasLoadedOptions, options, setHasLoadedOptions]);
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
      console.log('toggle');
    },
    selectedOptions: selectedOptions.map((option) =>
      typeof option === 'string' ? option : option.value
    ),
  };
}

interface Option {
  label: string;
  value: string;
}

export default useMultiselect;
