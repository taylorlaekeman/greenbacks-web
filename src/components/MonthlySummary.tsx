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

const MonthlySummary: FC = () => (
  <ArticleContainer id="monthly-summary" title="Monthly Summary">
    <MonthSelector />
    <MonthlyOverview />
    <TransactionsByTag />
    <AddFilter />
    <UntaggedTransactions />
    <MonthlyEarnings />
    <MonthlySavings />
    <MonthlyExpenses />
  </ArticleContainer>
);

export default MonthlySummary;
