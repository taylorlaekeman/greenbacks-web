import React, { FC } from 'react';

import noop from 'utils/noop';
import styled from 'utils/styled';

const Input: FC<{
  hasSharpLowerCorners?: boolean;
  id: string;
  onChange?: (input: string) => void;
  value?: string;
}> = ({ hasSharpLowerCorners = false, id, onChange = noop, value = '' }) => (
  <StyledInput
    $hasSharpLowerCorners={hasSharpLowerCorners}
    id={id}
    onChange={(event) => {
      onChange(event.target.value);
    }}
    value={value}
  />
);

const StyledInput = styled.input<{ $hasSharpLowerCorners?: boolean }>`
  border: solid black 1px;
  border-radius: 8px;
  outline: none;
  padding: 8px;
  width: 100%;

  ${({ $hasSharpLowerCorners }) => {
    if (!$hasSharpLowerCorners) return '';
    return `
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `;
  }}
`;

export default Input;
