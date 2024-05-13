import React, { FC } from 'react';

import { ReactComponent as CogIcon } from 'assets/icons/cog.svg';
import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg';
import { ReactComponent as TagIcon } from 'assets/icons/tag.svg';
import styled from 'utils/styled';

export const Icon: FC<{ icon: IconType }> = ({ icon }) => (
  <Wrapper>
    <InnerIcon icon={icon} />
  </Wrapper>
);

export enum IconType {
  Cog = 'cog',
  Filter = 'filter',
  Tag = 'tag',
}

const Wrapper = styled.div`
  height: 12px;
  width: 12px;

  & > svg {
    height: 100%;
    stroke: currentColor;
    width: 100%;
  }
`;

function InnerIcon({ icon }: { icon: IconType }): React.ReactElement {
  switch (icon) {
    case IconType.Cog:
      return <CogIcon />;
    case IconType.Tag:
      return <TagIcon />;
    case IconType.Filter:
    default:
      return <FilterIcon />;
  }
}

export default Icon;
