import React, { FC } from 'react';

import noop from 'utils/noop';

const Checkbox: FC<{
  isChecked?: boolean;
  label?: string;
  name?: string;
  onChange?: (isChecked: boolean) => void;
  value?: string;
}> = ({
  isChecked = false,
  label = '',
  onChange = noop,
  name = '',
  value = '',
}) => (
  <>
    <input
      checked={isChecked}
      data-checked={isChecked}
      id={value}
      name={name}
      onChange={() => {
        onChange(!isChecked);
      }}
      type="checkbox"
      value={value}
    />
    <label htmlFor={value}>{label}</label>
  </>
);

export default Checkbox;
