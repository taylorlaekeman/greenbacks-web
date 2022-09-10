import React, { FC } from 'react';

const SectionContainer: FC<{ id: string; title: string }> = ({
  children,
  id,
  title,
}) => (
  <section data-testid={`section-${id}`}>
    <h3>{title}</h3>
    {children}
  </section>
);

export default SectionContainer;
