import React, { FC } from 'react';

import ArticleContainer from 'components/ArticleContainer';
import SectionContainer from 'components/SectionContainer';
import TotalsByMonth from 'components/TotalsByMonth';
import Transactions from 'components/Transactions';
import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useUntaggedTransactions from 'hooks/useUntaggedTransactions';

const Overview: FC = () => {
  const { endIso: endDate, startIso: startDate } = useAveragingPeriod();
  const {
    earning: untaggedEarning,
    spending: untaggedSpending,
  } = useUntaggedTransactions({
    endDate,
    startDate,
  });

  return (
    <ArticleContainer id="overview" title="Overview">
      {untaggedEarning && (
        <SectionContainer id="untagged-earning" title="Untagged Earning">
          <Transactions transactions={untaggedEarning} />
        </SectionContainer>
      )}
      {untaggedSpending && (
        <SectionContainer
          id="untagged-spending"
          isCollapsible
          title={`Untagged Spending (${untaggedSpending.length})`}
        >
          <Transactions transactions={untaggedSpending} />
        </SectionContainer>
      )}
      <TotalsByMonth />
    </ArticleContainer>
  );
};

export default Overview;
