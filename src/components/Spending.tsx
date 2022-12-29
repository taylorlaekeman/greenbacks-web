import React, { FC } from 'react';

import AverageSpendingSummary from 'components/AverageSpendingSummary';
import PageWrapper from 'components/PageWrapper';

const Spending: FC = () => (
  <PageWrapper name="spending">
    <AverageSpendingSummary />
  </PageWrapper>
);

export default Spending;
