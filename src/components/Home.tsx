import React, { FC } from 'react';

import Link from 'components/Link';
import MonthlySummary from 'components/MonthlySummary';
import Overview from 'components/Overview';
import PageWrapper from 'components/PageWrapper';
import useSavingsRate from 'hooks/useSavingsRate';

const Home: FC = () => {
  const { error } = useSavingsRate();

  if (error) {
    const { message } = error;
    if (message === 'Reauthentication required for a connected account') {
      return (
        <>
          <p>At least one of your accounts needs reauthentication</p>
          <Link href="accounts">Accounts</Link>
        </>
      );
    }
  }

  return (
    <PageWrapper name="home">
      <Overview />
      <MonthlySummary />
    </PageWrapper>
  );
};

export default Home;
