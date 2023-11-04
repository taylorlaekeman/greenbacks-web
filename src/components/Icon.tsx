import React, { FC } from 'react';

import styled from 'utils/styled';

const IconComponent: FC<{ icon: IconType }> = ({ icon }) => {
  const href = `dist/assets/icons/${icon}.svg`;
  return (
    <Wrapper>
      <use href={href} />
    </Wrapper>
  );
};

export enum IconType {
  Filter = 'filter',
}

const Wrapper = styled.svg`
  background-color: yellow;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2px;
  width: 24px;
`;

export default IconComponent;
