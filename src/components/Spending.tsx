import React, { FC, useState } from 'react';

import AverageSpendingSummary from 'components/AverageSpendingSummary';
import Checkboxes from 'components/Checkboxes';
import MonthlySpendingGraph from 'components/MonthlySpendingGraph';
import PageWrapper from 'components/PageWrapper';
import SpendingByTagAndMonthGraph from 'components/SpendingByTagAndMonthGraph';
import TransactionsByTag from 'components/TransactionsByTag';
import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useTagsByCategory from 'hooks/useTagsByCategory';
import useTransactionsByTag from 'hooks/useTransactionsByTag';

const Spending: FC = () => {
  const { count, endIso: endDate, startIso: startDate } = useAveragingPeriod();
  const {
    isLoading: isLoadingTransactionsByTag,
    spending: spendingByTag,
  } = useTransactionsByTag({ endDate, startDate });
  const { spending: spendingTags } = useTagsByCategory();
  const [selectedTags, setSelectedTags] = useState<string[] | undefined>(
    spendingTags
  );
  return (
    <PageWrapper name="spending">
      <AverageSpendingSummary />
      <MonthlySpendingGraph />
      <TransactionsByTag
        id="average-spending-by-tag"
        isGraphVisible
        isLoading={isLoadingTransactionsByTag}
        months={count}
        name="Average Spending by Tag"
        transactions={spendingByTag}
      />
      <SpendingByTagAndMonthGraph selectedTags={selectedTags} />
      <Checkboxes
        onChange={(newSelectedTags) => setSelectedTags(newSelectedTags)}
        options={spendingTags}
        selectedOptions={selectedTags || spendingTags}
      />
    </PageWrapper>
  );
};

export default Spending;
