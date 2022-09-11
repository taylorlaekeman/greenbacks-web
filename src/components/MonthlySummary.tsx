import React, { FC } from 'react';

import ArticleContainer from 'components/ArticleContainer';
import MonthlyExpenses from 'components/MonthlyExpenses';
import MonthSelector from 'components/MonthSelector';
import TransactionsByTag from 'components/TransactionsByTag';
import UntaggedTransactions from 'components/UntaggedTransactions';

const MonthlySummary: FC = () => (
  <ArticleContainer id="monthly-summary" title="Monthly Summary">
    <MonthSelector />
    <TransactionsByTag />
    <UntaggedTransactions />
    <MonthlyExpenses />
  </ArticleContainer>
);

export default MonthlySummary;
