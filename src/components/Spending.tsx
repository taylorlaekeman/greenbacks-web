import React, { FC } from 'react';

import AverageSpendingSummary from 'components/AverageSpendingSummary';
import MonthlySpendingGraph from 'components/MonthlySpendingGraph';
import PageWrapper from 'components/PageWrapper';

const Spending: FC = () => (
  <PageWrapper name="spending">
    <AverageSpendingSummary />
    <MonthlySpendingGraph />
  </PageWrapper>
);

export default Spending;
