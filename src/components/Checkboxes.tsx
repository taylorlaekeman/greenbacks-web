import React, { FC, Fragment } from 'react';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import noop from 'utils/noop';

const Checkboxes: FC<{
  label?: string;
  name?: string;
  onChange?: (input: string[]) => void;
  onDeselectAll?: () => void;
  onSelectAll?: () => void;
  options?: (Option | string)[];
  selectedOptions?: string[];
}> = ({
  label,
  name = 'checkbox',
  onChange = noop,
  onDeselectAll = noop,
  onSelectAll = noop,
  options = [],
  selectedOptions = [],
}) => (
  <fieldset>
    {label && <legend>{label}</legend>}
    {options.map((option) => {
      const { label: optionLabel, value: optionValue } = getOption(option);
      const isChecked = selectedOptions.includes(optionValue);
      return (
        <Fragment key={optionValue}>
          <Checkbox
            isChecked={isChecked}
            label={optionLabel}
            name={name}
            onChange={() => {
              onChange(
                getNewSelectedOptions({
                  changedOption: optionValue,
                  selectedOptions,
                })
              );
            }}
            value={optionValue}
          />
        </Fragment>
      );
    })}
    <Button
      onClick={() => {
        onSelectAll();
        onChange(
          options.map((option) => {
            if (typeof option === 'string') return option;
            return option.value;
          })
        );
      }}
    >
      Select all
    </Button>
    <Button
      onClick={() => {
        onDeselectAll();
        onChange([]);
      }}
    >
      Deselect all
    </Button>
  </fieldset>
);

interface Option {
  label: string;
  value: string;
}

const getOption = (option: Option | string): Option => {
  if (typeof option === 'string') return { label: option, value: option };
  return option;
};

const getNewSelectedOptions = ({
  changedOption,
  selectedOptions,
}: {
  changedOption: string;
  selectedOptions: string[];
}): string[] => {
  const isOptionAlreadySelected = selectedOptions.includes(changedOption);
  if (!isOptionAlreadySelected) return [...selectedOptions, changedOption];
  return selectedOptions.filter((option) => option !== changedOption);
};

export default Checkboxes;
