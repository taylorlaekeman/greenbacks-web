import React, { FC } from 'react';

import noop from 'utils/noop';

const Input: FC<{
  id: string;
  onChange?: (input: string) => void;
  value?: string;
}> = ({ id, onChange = noop, value = '' }) => (
  <input
    id={id}
    onChange={(event) => {
      onChange(event.target.value);
    }}
    value={value}
  />
);

export default Input;
