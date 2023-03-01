import React, { FC, Fragment } from 'react';

import Button from 'components/Button';
import noop from 'utils/noop';

const Checkboxes: FC<{
  label?: string;
  name?: string;
  onChange?: (input: string[]) => void;
  options?: (Option | string)[];
  selectedOptions?: string[];
}> = ({
  label,
  name = 'checkbox',
  onChange = noop,
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
          <input
            checked={isChecked}
            data-checked={isChecked}
            id={optionValue}
            name={name}
            onChange={() => {
              onChange(
                getNewSelectedOptions({
                  changedOption: optionValue,
                  selectedOptions,
                })
              );
            }}
            type="checkbox"
            value={optionValue}
          />
          <label htmlFor={optionValue}>{optionLabel}</label>
        </Fragment>
      );
    })}
    <Button
      onClick={() => {
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
    <Button onClick={() => onChange([])}>Deselect all</Button>
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