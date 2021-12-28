import React, { FC } from 'react';

const VisibleObject: FC<Props> = ({ id, object }) => (
  <>
    {Object.entries(object).map(([field, value]) => {
      const key = `${id}-${field}`;
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
  object: Record<string, { toString: () => string }>;
}

export default VisibleObject;
