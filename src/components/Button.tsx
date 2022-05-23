import React, { FC } from 'react';

import noop from 'utils/noop';

const Button: FC<Props> = ({ children, onClick = noop }) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);

interface Props {
  onClick?: () => void;
}

export default Button;
