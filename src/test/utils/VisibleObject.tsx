import React, { FC } from 'react';

const VisibleObject: FC<Props> = ({ id, object }) => (
  <>
    {Object.entries(object).map(([field, value]) => {
      const key = `${id}-${field}`;
      if (typeof value === 'object')
        return <VisibleObject id={key} key={key} object={value} />;
      return (
        <p data-testid={key} key={key}>
          {value.toString()}
        </p>
      );
    })}
  </>
);

interface Props {
  id: string;
  object: Record<string, any>;
}

export default VisibleObject;
