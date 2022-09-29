import React, { FC } from 'react';

import AddFilter from 'components/AddFilter';
import ArticleContainer from 'components/ArticleContainer';
import MonthlyEarnings from 'components/MonthlyEarnings';
import MonthlyExpenses from 'components/MonthlyExpenses';
import MonthlySavings from 'components/MonthlySavings';
import MonthlyOverview from 'components/MonthlyOverview';
import MonthSelector from 'components/MonthSelector';
import TransactionsByTag from 'components/TransactionsByTag';
import UntaggedTransactions from 'components/UntaggedTransactions';
import useMonth from 'hooks/useMonth';
import useTransactionsByTag from 'hooks/useTransactionsByTag';

const MonthlySummary: FC = () => {
  const { endDate, startDate } = useMonth();
  const { isLoading, spending } = useTransactionsByTag({ endDate, startDate });
  return (
    <ArticleContainer id="monthly-summary" title="Monthly Summary">
      <MonthSelector />
      <MonthlyOverview />
      <TransactionsByTag isLoading={isLoading} transactions={spending} />
      <AddFilter />
      <UntaggedTransactions />
      <MonthlyEarnings />
      <MonthlySavings />
      <MonthlyExpenses />
    </ArticleContainer>
  );
};

export default MonthlySummary;
