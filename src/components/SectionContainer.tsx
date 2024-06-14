import React, { FC, useState } from 'react';

import Button from 'components/Button';
import noop from 'utils/noop';

const SectionContainer: FC<{
  id: string;
  isCollapsedByDefault?: boolean;
  isCollapsible?: boolean;
  title: string;
}> = ({
  children,
  id,
  isCollapsedByDefault = false,
  isCollapsible = false,
  title,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    isCollapsible && isCollapsedByDefault,
  );
  return (
    <section data-testid={`section-${id}`}>
      <SectionTitle
        isCollapsible={isCollapsible}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {title}
      </SectionTitle>
      {!isCollapsed && children}
    </section>
  );
};

const SectionTitle: FC<{ isCollapsible?: boolean; onClick?: () => void }> = ({
  children,
  isCollapsible = false,
  onClick = noop,
}) => {
  if (!isCollapsible) return <h3>{children}</h3>;

  return (
    <Button onClick={onClick}>
      <h3>{children}</h3>
    </Button>
  );
};

export default SectionContainer;
