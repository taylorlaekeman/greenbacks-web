import React from 'react';
import styled, { css } from 'styled-components';

export function Text({
  children,
  heirarchy = Heirarchy.P,
  isBold = false,
  isCenterAligned = false,
  isRightAligned = false,
  size = Size.Medium,
}: {
  children: React.ReactNode;
  heirarchy?: Heirarchy;
  isBold?: boolean;
  isCenterAligned?: boolean;
  isRightAligned?: boolean;
  size?: Size;
}): React.ReactElement {
  const InnerText = getInnerText({ heirarchy });
  return (
    <InnerText
      isBold={isBold}
      isCenterAligned={isCenterAligned}
      isRightAligned={isRightAligned}
      size={size}
    >
      {children}
    </InnerText>
  );
}

export enum Size {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum Heirarchy {
  H1 = 'h1',
  H2 = 'h2',
  P = 'p',
}

function getInnerText({
  heirarchy,
}: {
  heirarchy: Heirarchy;
}): React.FC<InnerTextProps> {
  switch (heirarchy) {
    case Heirarchy.H1:
      return H1;
    case Heirarchy.H2:
      return H2;
    case Heirarchy.P:
    default:
      return P;
  }
}

interface InnerTextProps {
  isBold: boolean;
  isCenterAligned: boolean;
  isRightAligned: boolean;
  size: Size;
}

const sharedStyles = css<InnerTextProps>`
  font-family: 'Lora', serif;
  ${({ size }) => `font-size: ${getFontSize({ size })};`}
  ${({ isBold }) => isBold && 'font-weight: 700;'}
  margin: 0;
  ${({ isCenterAligned }) => isCenterAligned && 'text-align: center;'}
  ${({ isRightAligned }) => isRightAligned && 'text-align: right;'}
`;

const P = styled.p<InnerTextProps>`
  ${sharedStyles}
`;

const H1 = styled.h1<InnerTextProps>`
  ${sharedStyles}
`;

const H2 = styled.h2<InnerTextProps>`
  ${sharedStyles}
`;

function getFontSize({ size }: { size: Size }): string {
  switch (size) {
    case Size.Large:
      return '2rem';
    case Size.Small:
      return '0.8rem';
    case Size.Medium:
    default:
      return '1rem';
  }
}
