import React, { FC } from 'react';

import ArticleContainer from 'components/ArticleContainer';
import CashFlowGraph from 'components/CashFlowGraph';
import LoadingIndicator from 'components/LoadingIndicator';
import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySaving from 'hooks/useAverageMonthlySaving';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';

const AverageCashFlow: FC = () => {
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
  const { format } = useCurrencyFormatter();

  const isLoading =
    isLoadingAverageEarning ||
    isLoadingAverageSaving ||
    isLoadingAverageSpending;

  if (isLoading) return <LoadingIndicator />;

  const formattedAverageEarning = format({ value: averageMonthlyEarning });
  const formattedAverageSaving = format({ value: averageMonthlySaving });
  const formattedAverageSpending = format({ value: averageMonthlySpending });

  return (
    <ArticleContainer id="average-cashflow" title="Average Cashflow">
      <CashFlowGraph
        earning={averageMonthlyEarning}
        idPrefix="average"
        isLoading={isLoading}
        saving={averageMonthlySaving}
        spending={averageMonthlySpending}
      />
      <p>{`You earn ${formattedAverageEarning} per month on average`}</p>
      <p>{`You save ${formattedAverageSaving} per month on average`}</p>
      <p>{`You spend ${formattedAverageSpending} per month on average`}</p>
    </ArticleContainer>
  );
};

export default AverageCashFlow;
