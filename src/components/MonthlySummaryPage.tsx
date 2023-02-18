import React, { FC } from 'react';

import PageWrapper from 'components/PageWrapper';
import useAverageMonthlySpending from 'hooks/useAverageMonthlySpending';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';

const MonthlySummaryPage: FC = () => {
  const { averageMonthlySpending } = useAverageMonthlySpending();
  const { format } = useCurrencyFormatter();

  const formattedAverageMonthlySpending = format({
    value: averageMonthlySpending,
  });
  return (
    <PageWrapper name="monthly-summary">
      <p>{`Average monthly spending: ${formattedAverageMonthlySpending}`}</p>
    </PageWrapper>
  );
};

export default MonthlySummaryPage;
