import React from 'react';
import styled from 'styled-components';

export function JustifiedRow({
  children,
  space = Space.None,
}: {
  children?: React.ReactNode;
  space?: Space;
}): React.ReactElement {
  return <Wrapper space={space}>{children}</Wrapper>;
}

const Wrapper = styled.div<{ space: Space }>`
  align-items: baseline;
  display: flex;
  gap: ${({ space }) => getWidth({ space })};
  justify-content: space-between;
`;

export enum Space {
  None = 'none',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

function getWidth({ space }: { space: Space }): string {
  switch (space) {
    case Space.Small:
      return '4px';
    case Space.Medium:
      return '16px';
    case Space.Large:
      return '32px';
    case Space.None:
    default:
      return '0';
  }
}
