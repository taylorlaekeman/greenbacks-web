import React, { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';
import noop from 'utils/noop';

const Button: FC<{
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}> = ({ children, onClick = noop, isDisabled = false, isLoading = false }) => (
  <button disabled={isDisabled || isLoading} onClick={onClick} type="button">
    {isLoading && <Cog />}
    {!isLoading && children}
  </button>
);

const Cog = styled(UnstyledCog)`
  animation: spin 2s linear infinite;
  width: 20px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Button;
