import React, { FC } from 'react';

const Label: FC<{ forId: string }> = ({ children, forId }) => (
  <label htmlFor={forId}>{children}</label>
);

export default Label;
