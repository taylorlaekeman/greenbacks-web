import React, { FC } from 'react';

import AmountBadge from 'components/AmountBadge';
import ArticleContainer from 'components/ArticleContainer';
import CashFlowGraph from 'components/CashFlowGraph';
import PercentBadge from 'components/PercentBadge';
import SectionContainer from 'components/SectionContainer';
import TotalsByMonth from 'components/TotalsByMonth';
import Transactions from 'components/Transactions';
import TransactionsByTag from 'components/TransactionsByTag';
import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySaving from 'hooks/useAverageMonthlySaving';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';
import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useSavingsRate from 'hooks/useSavingsRate';
import useTransactionsByTag from 'hooks/useTransactionsByTag';
import useUntaggedTransactions from 'hooks/useUntaggedTransactions';
import styled from 'utils/styled';

const Overview: FC = () => {
  const { count, endIso: endDate, startIso: startDate } = useAveragingPeriod();
  const {
    averageMonthlyEarning,
    isLoading: isLoadingAverageEarning,
  } = useAverageMonthlyEarning();
  const {
    averageMonthlySpending,
    isLoading: isLoadingAverageSpending,
  } = useAverageMonthlySpending();
  const {
    averageMonthlySaving,
    isLoading: isLoadingAverageSaving,
  } = useAverageMonthlySaving();
  const { savingsRate, isLoading: isLoadingSavingsRate } = useSavingsRate();
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
      <CashFlowGraph
        earning={averageMonthlyEarning}
        idPrefix="average"
        isLoading={
          isLoadingAverageEarning ||
          isLoadingAverageSaving ||
          isLoadingAverageSpending
        }
        saving={averageMonthlySaving}
        spending={averageMonthlySpending}
      />
      <BadgeGrid>
        <AmountBadge
          amount={averageMonthlyEarning}
          isLoading={isLoadingAverageEarning}
          label="Average monthly earning"
          name="average-monthly-earnings"
        />
        <AmountBadge
          amount={averageMonthlySpending}
          isLoading={isLoadingAverageSpending}
          label="Average monthly spending"
          name="average-monthly-expenses"
        />
        <AmountBadge
          amount={averageMonthlySaving}
          isLoading={isLoadingAverageSaving}
          label="Average monthly saving"
          name="average-monthly-savings"
        />
        <PercentBadge
          isLoading={isLoadingSavingsRate}
          label="Savings rate"
          name="average-savings-rate"
          percent={savingsRate}
        />
      </BadgeGrid>
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

const BadgeGrid = styled.section`
  display: grid;
  grid-gap: 30px 0;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 50px;
`;

export default Overview;
