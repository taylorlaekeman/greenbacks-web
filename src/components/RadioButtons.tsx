import React, { FC, Fragment } from 'react';

import noop from 'utils/noop';

const RadioButtons: FC<{
  label?: string;
  name?: string;
  onChange?: (input: string) => void;
  options?: (Option | string)[];
  value?: string;
}> = ({
  label,
  name = 'radio-button',
  onChange = noop,
  options = [],
  value,
}) => (
  <fieldset>
    {label && <legend>{label}</legend>}
    {options.map((option) => {
      const { label: optionLabel, value: optionValue } = getOption(option);
      return (
        <Fragment key={optionValue}>
          <input
            checked={optionValue === value}
            id={optionValue}
            name={name}
            onChange={() => {
              onChange(optionValue);
            }}
            type="radio"
            value={optionValue}
          />
          <label htmlFor={optionValue}>{optionLabel}</label>
        </Fragment>
      );
    })}
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

export default RadioButtons;
