import React, { FC } from 'react';

import Link from 'components/Link';
import useMonth from 'hooks/useMonth';

const MonthSelector: FC = () => {
  const { nextMonth, previousMonth, readable: readableMonth } = useMonth();
  return (
    <>
      <p>{readableMonth}</p>
      <Link href={`/months/${previousMonth}/`}>Go to previous month</Link>
      <Link href={`/months/${nextMonth}/`}>Go to next month</Link>
    </>
  );
};

export default MonthSelector;
