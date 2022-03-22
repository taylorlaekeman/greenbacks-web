import React, { FunctionComponent } from 'react';

import TotalSpending from 'components/TotalSpending';
import useMonthlyTotal from 'hooks/useMonthlyTotal';
import { Link } from 'routing';
import datetime from 'utils/datetime';
import styled from 'utils/styled';

const Home: FunctionComponent = () => {
  const now = datetime.now();
  const total = useMonthlyTotal();
  return (
    <Main>
      <Link to="/connections">connections</Link>
      <TotalSpending amount={total} month={`${now.year}-${now.month}`} />
    </Main>
  );
};

const Main = styled.main`
  display: grid;
  grid-template-rows: max-content 1fr;
  height: 100%;
`;

export default Home;
