import React, { FunctionComponent } from 'react';

import useMonthlyTotal from 'hooks/useMonthlyTotal';
import { Link } from 'routing';
import datetime from 'utils/datetime';
import TotalSpending from 'views/TotalSpending';

const Home: FunctionComponent = () => {
  const now = datetime.now();
  const total = useMonthlyTotal();
  return (
    <main>
      <Link to="/connections">connections</Link>
      <TotalSpending amount={total} month={`${now.year}-${now.month}`} />
    </main>
  );
};

export default Home;
