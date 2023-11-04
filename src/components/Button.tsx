import React, { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';
import noop from 'utils/noop';

const Button: FC<{
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: ButtonStyle;
}> = ({
  children,
  onClick = noop,
  isDisabled = false,
  isLoading = false,
  style = ButtonStyle.Primary,
}) => (
  <StyledButton
    disabled={isDisabled || isLoading}
    onClick={onClick}
    $style={style}
    type="button"
  >
    {isLoading && <Cog />}
    {!isLoading && children}
  </StyledButton>
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

export enum ButtonStyle {
  Primary,
  Text,
}

const StyledButton = styled.button<{ $style: ButtonStyle }>`
  ${(props) =>
    props.$style === ButtonStyle.Text &&
    `
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    text-decoration: underline;
  `}
`;

export default Button;
