import React, { FC } from 'react';

import MonthlySummary from 'components/MonthlySummary';
import PageWrapper from 'components/PageWrapper';

const Home: FC = () => (
  <PageWrapper name="home">
    <MonthlySummary />
  </PageWrapper>
);

export default Home;
