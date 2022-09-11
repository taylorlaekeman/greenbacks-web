import React, { FC } from 'react';

import ArticleContainer from 'components/ArticleContainer';
import MonthlyExpenses from 'components/MonthlyExpenses';
import MonthSelector from 'components/MonthSelector';
import TransactionsByTag from 'components/TransactionsByTag';

const MonthlySummary: FC = () => (
  <ArticleContainer id="monthly-summary" title="Monthly Summary">
    <MonthSelector />
    <TransactionsByTag />
    <MonthlyExpenses />
  </ArticleContainer>
);

export default MonthlySummary;
