import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';
import noop from 'utils/noop';

export const Button: FC<{
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  style?: ButtonStyle;
}> = ({
  children,
  isDisabled = false,
  isLoading = false,
  onClick = noop,
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
  Unstyled,
}

const StyledButton = styled.button<{ $style: ButtonStyle }>`
  ${({ $style }) => getStyle({ style: $style })}
`;

function getStyle({ style }: { style: ButtonStyle }) {
  switch (style) {
    case ButtonStyle.Text:
      return textStyle;
    case ButtonStyle.Unstyled:
      return unstyledStyle;
    case ButtonStyle.Primary:
    default:
      return primaryStyle;
  }
}

const primaryStyle = css``;

const textStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  text-decoration: underline;
`;

const unstyledStyle = css`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  outline: inherit;
  padding: 0;
  text-align: inherit;
  width: 100%;
`;

export default Button;
