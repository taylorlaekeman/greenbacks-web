import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';
import noop from 'utils/noop';

export const Button: FC<{
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  style?: ButtonStyle;
}> = ({
  children,
  isDisabled = false,
  isFullWidth = false,
  isLoading = false,
  onClick = noop,
  style = ButtonStyle.Primary,
}) => (
  <StyledButton
    disabled={isDisabled || isLoading}
    $isFullWidth={isFullWidth}
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

interface StyleProps {
  $isFullWidth: boolean;
  $style: ButtonStyle;
}

const StyledButton = styled.button<StyleProps>`
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

const sharedStyles = css<StyleProps>`
  ${({ $isFullWidth }) => $isFullWidth && 'width: 100%;'}
`;

const primaryStyle = css<StyleProps>`
  ${sharedStyles}
`;

const textStyle = css<StyleProps>`
  ${sharedStyles}
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  padding: 0;
  text-decoration: underline;
`;

const unstyledStyle = css<StyleProps>`
  ${sharedStyles}
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
  outline: inherit;
  padding: 0;
  text-align: inherit;
`;

export default Button;
