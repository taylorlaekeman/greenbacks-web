import React, { FC } from 'react';

import PageWrapper from 'components/PageWrapper';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useMonth from 'hooks/useMonth';
import useTotalSpending from 'hooks/useTotalSpending';

const MonthlySummaryPage: FC = () => {
  const { averageMonthlySpending } = useAverageMonthlySpending();
  const { format } = useCurrencyFormatter();
  const { endDate, startDate } = useMonth();
  const { totalSpending: spendingSoFar } = useTotalSpending({
    endDate,
    startDate,
  });

  const formattedAverageMonthlySpending = format({
    value: averageMonthlySpending,
  });

  const formattedSpendingSoFar = format({ value: spendingSoFar });

  return (
    <PageWrapper name="monthly-summary">
      <p>{`Spending so far: ${formattedSpendingSoFar}`}</p>
      <p>{`Average monthly spending: ${formattedAverageMonthlySpending}`}</p>
    </PageWrapper>
  );
};

export default MonthlySummaryPage;
