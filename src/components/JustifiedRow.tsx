import React from 'react';
import styled from 'styled-components';

export function JustifiedRow({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
