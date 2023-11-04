import React, { FC } from 'react';

import noop from 'utils/noop';
import styled from 'utils/styled';

const RadioButtons: FC<{
  hasSharpUpperCorners?: boolean;
  label?: string;
  name?: string;
  onChange?: (input: string) => void;
  options?: (Option | string)[];
  value?: string;
}> = ({
  hasSharpUpperCorners = false,
  label,
  name = 'radio-button',
  onChange = noop,
  options = [],
  value,
}) => (
  <FieldSet $hasSharpUpperCorners={hasSharpUpperCorners}>
    {label && <legend>{label}</legend>}
    {options.map((option) => {
      const { label: optionLabel, value: optionValue } = getOption(option);
      return (
        <InputOption key={optionValue}>
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
        </InputOption>
      );
    })}
  </FieldSet>
);

interface Option {
  label: string;
  value: string;
}

const getOption = (option: Option | string): Option => {
  if (typeof option === 'string') return { label: option, value: option };
  return option;
};

const FieldSet = styled.fieldset<{ $hasSharpUpperCorners?: boolean }>`
  border: none;
  padding: 0;

  div:last-child {
    border-bottom: solid black 1px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  ${({ $hasSharpUpperCorners }) => {
    if ($hasSharpUpperCorners) return '';
    return `
      div:first-of-type {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    `;
  }}
`;

const InputOption = styled.div`
  align-items: center;
  border: solid black 1px;
  border-bottom: none;
  display: grid;
  grid-template-columns: max-content 1fr;

  input {
    margin: 8px;
  }

  label {
    padding: 8px;
    padding-left: 0;
  }
`;

export default RadioButtons;
