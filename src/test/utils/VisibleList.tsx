import React, { FC } from 'react';

import VisibleObject from './VisibleObject';

const VisibleList: FC<Props> = ({ id, list }) => (
  <>
    {list.map((object, index) => {
      const key = `${id}-${index}`;
      return <VisibleObject id={key} key={key} object={object} />;
    })}
  </>
);

interface Props {
  id: string;
  list: Record<string, { toString: () => string }>[];
}

export default VisibleList;
