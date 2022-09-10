import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import useMonth from 'hooks/useMonth';

const MonthSelector: FC = () => {
  const { nextMonth, previousMonth, readable: readableMonth } = useMonth();
  return (
    <>
      <p>{readableMonth}</p>
      <Link to={`/months/${previousMonth}/`}>Go to previous month</Link>
      <Link to={`/months/${nextMonth}/`}>Go to next month</Link>
    </>
  );
};

export default MonthSelector;
