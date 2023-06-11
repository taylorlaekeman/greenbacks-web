import React, { FC, useState } from 'react';

import ArticleContainer from 'components/ArticleContainer';
import CashFlowGraph from 'components/CashFlowGraph';
import LoadingIndicator from 'components/LoadingIndicator';
import RadioButtons from 'components/RadioButtons';
import useAverageMonthlyEarning from 'hooks/useAverageMonthlyEarning';
import useAverageMonthlySaving from 'hooks/useAverageMonthlySaving';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';

const AverageCashFlow: FC = () => {
  const [selectedAverage, setSelectedAverage] = useState<string>('12');
  const monthsToAverage = parseInt(selectedAverage, 10);
  const {
    averageMonthlyEarning,
    isLoading: isLoadingAverageEarning,
  } = useAverageMonthlyEarning({ months: monthsToAverage });
  const {
    averageMonthlySpending,
    isLoading: isLoadingAverageSpending,
  } = useAverageMonthlySpending({ months: monthsToAverage });
  const {
    averageMonthlySaving,
    isLoading: isLoadingAverageSaving,
  } = useAverageMonthlySaving({ months: monthsToAverage });
  const { format } = useCurrencyFormatter();

  const isLoading =
    isLoadingAverageEarning ||
    isLoadingAverageSaving ||
    isLoadingAverageSpending;

  if (isLoading) return <LoadingIndicator />;

  const formattedAverageEarning = format({ value: averageMonthlyEarning });
  const formattedAverageSaving = format({ value: averageMonthlySaving });
  const formattedAverageSpending = format({ value: averageMonthlySpending });
  const formattedAverageOutflow = format(
    (averageMonthlySaving || 0) + (averageMonthlySpending || 0)
  );

  return (
    <ArticleContainer id="average-cashflow" title="Average Cashflow">
      <RadioButtons
        label="Average"
        onChange={(value) => setSelectedAverage(value)}
        options={[
          { label: '3 month', value: '3' },
          { label: '6 month', value: '6' },
          { label: '12 month', value: '12' },
        ]}
        value={selectedAverage}
      />
      <CashFlowGraph
        earning={averageMonthlyEarning}
        idPrefix="average"
        isLoading={isLoading}
        saving={averageMonthlySaving}
        spending={averageMonthlySpending}
      />
      <p>{`Inflow: ${formattedAverageEarning}`}</p>
      <ul>
        <li>{`You earn ${formattedAverageEarning} per month on average`}</li>
      </ul>
      <p>{`Outflow: ${formattedAverageOutflow}`}</p>
      <ul>
        <li>{`You save ${formattedAverageSaving} per month on average`}</li>
        <li>{`You spend ${formattedAverageSpending} per month on average`}</li>
      </ul>
    </ArticleContainer>
  );
};

export default AverageCashFlow;
