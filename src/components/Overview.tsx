import React, { FC } from 'react';

import ArticleContainer from 'components/ArticleContainer';
import SectionContainer from 'components/SectionContainer';
import TotalsByMonth from 'components/TotalsByMonth';
import Transactions from 'components/Transactions';
import TransactionsByTag from 'components/TransactionsByTag';
import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useTransactionsByTag from 'hooks/useTransactionsByTag';
import useUntaggedTransactions from 'hooks/useUntaggedTransactions';

const Overview: FC = () => {
  const { count, endIso: endDate, startIso: startDate } = useAveragingPeriod();
  const {
    isLoading: isLoadingTransactionsByTag,
    spending: spendingByTag,
  } = useTransactionsByTag({ endDate, startDate });
  const {
    earning: untaggedEarning,
    spending: untaggedSpending,
  } = useUntaggedTransactions({
    endDate,
    startDate,
  });

  return (
    <ArticleContainer id="overview" title="Overview">
      <TransactionsByTag
        id="average-spending-by-tag"
        isGraphVisible
        isLoading={isLoadingTransactionsByTag}
        months={count}
        name="Average Spending by Tag"
        transactions={spendingByTag}
      />
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
