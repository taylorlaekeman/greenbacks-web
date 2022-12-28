import React, { FC } from 'react';

import AmountBadge from 'components/AmountBadge';
import ArticleContainer from 'components/ArticleContainer';
import CashFlowGraph from 'components/CashFlowGraph';
import Link from 'components/Link';
import PercentBadge from 'components/PercentBadge';
import SectionContainer from 'components/SectionContainer';
import TotalsByMonth from 'components/TotalsByMonth';
import Transactions from 'components/Transactions';
import TransactionsByTag from 'components/TransactionsByTag';
import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySaving from 'hooks/useAverageMonthlySaving';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';
import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useSavingsRate from 'hooks/useSavingsRate';
import useSpendingRate from 'hooks/useSpendingRate';
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
  const { spendingRate, isLoading: isLoadingSpendingRate } = useSpendingRate();
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
  const { format } = useCurrencyFormatter();

  const isAverageSavingVisible =
    !isLoadingAverageSaving && !isLoadingSavingsRate;
  const isAverageSpendingVisible =
    !isLoadingAverageSpending && !isLoadingSpendingRate;
  const formattedAverageEarning = format({ value: averageMonthlyEarning });
  const formattedAverageSaving = format({ value: averageMonthlySaving });
  const formattedAverageSpending = format({ value: averageMonthlySpending });

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
      {!isLoadingAverageEarning && (
        <p>{`You earn ${formattedAverageEarning} per month on average`}</p>
      )}
      {isAverageSavingVisible && (
        <p>
          {getSummaryText({
            formattedAmount: formattedAverageSaving,
            rate: savingsRate,
            verb: 'save',
          })}
        </p>
      )}
      {isAverageSpendingVisible && (
        <>
          <p>
            {getSummaryText({
              formattedAmount: formattedAverageSpending,
              rate: spendingRate,
              verb: 'spend',
            })}
          </p>
          <Link href="/spending">Explore spending</Link>
        </>
      )}
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

const getSummaryText = ({
  formattedAmount,
  rate,
  verb,
}: {
  formattedAmount: string;
  rate?: number;
  verb: string;
}) => {
  const amountText = `You ${verb} ${formattedAmount} per month on average`;
  if (!rate) return amountText;
  const formattedRate = `${Math.round((rate || 0) * 100)}%`;
  const rateText = `(${formattedRate} of earning)`;
  return `${amountText} ${rateText}`;
};

export default Overview;
