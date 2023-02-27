import React, { FC } from 'react';

import MonthlySummary from 'components/MonthlySummary';
import Overview from 'components/Overview';
import PageWrapper from 'components/PageWrapper';

const Home: FC = () => (
  <PageWrapper name="home">
    <Overview />
    <MonthlySummary />
  </PageWrapper>
);

export default Home;
