import React, { FC, useContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import AccountConnectionBarrier from 'components/AccountConnectionBarrier';
import Accounts from 'components/Accounts';
import CashFlow from 'components/CashFlow';
import AverageSpendingByTag from 'components/AverageSpendingByTag';
import { CategoryAverageSummaryContainer } from 'components/CategoryAverageSummary';
import Button from 'components/Button';
import Filters from 'components/Filters';
import { Header } from 'components/Header';
import Home from 'components/Home';
import LoadingIndicator from 'components/LoadingIndicator';
import MonthlySpendingByTag from 'components/MonthlySpendingByTag';
import Select from 'components/Select';
import Spending from 'components/Spending';
import { SpendingSummaryListPage } from 'components/SpendingSummaryListPage';
import SpendingTimeline from 'components/SpendingTimeline';
import TagModal from 'components/TagModal';
import TopSpendingCategories from 'components/TopSpendingCategories';
import TotalsByMonth from 'components/TotalsByMonth';
import TransactionsPage from 'components/TransactionsPage';
import UntaggedTransactions from 'components/UntaggedTransactions';
import TagModalContext, { TagModalProvider } from 'context/TagModal';
import useIsApiReady from 'hooks/useIsApiReady';
import useIsAuthenticated from 'hooks/useIsAuthenticated';
import useLogin from 'hooks/useLogin';
import useLogout from 'hooks/useLogout';

const Greenbacks: FC = () => (
  <TagModalProvider>
    <GreenbacksInContext />
  </TagModalProvider>
);

const GreenbacksInContext: FC = () => {
  const { transactionToTag } = useContext(TagModalContext);
  const { isReady: isApiReady } = useIsApiReady();
  const { isAuthenticated } = useIsAuthenticated();
  const { login } = useLogin();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [page, setPage] = useState<string>('');

  if (!isAuthenticated) return <Button onClick={login}>Login</Button>;

  if (!isApiReady) return <LoadingIndicator />;

  const home = (
    <AccountConnectionBarrier>
      <Home />
    </AccountConnectionBarrier>
  );

  const spending = (
    <AccountConnectionBarrier>
      <Spending />
    </AccountConnectionBarrier>
  );

  const options = [
    { label: 'Spending Summary List', value: 'spending-summary-list' },
    { label: 'Average Spending Summary', value: 'average-spending-summary' },
    {
      label: 'Totals by Month',
      value: 'totals-by-month',
    },
    {
      label: 'Spending Timeline',
      value: 'spending-timeline',
    },
    {
      label: 'Transactions',
      value: 'transactions',
    },
    {
      label: 'Monthly Spending by Tag',
      value: 'monthly-spending-by-tag',
    },
    { label: 'Filters', value: 'filters' },
  ];

  return (
    <>
      <PageWrapper>
        <Header onLogout={logout} />
        <PageBody>
          <Select
            id="page-selector"
            onChange={(newPage) => {
              setPage(newPage);
              navigate(`/${newPage}`);
            }}
            options={options}
            value={page}
          />
          {transactionToTag !== undefined && <TagModal />}
          <Routes>
            <Route path="/" element={home} />
            <Route path="/months/:month/" element={home} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/spending" element={spending} />
            <Route path="/cashflow" element={<CashFlow />} />
            <Route
              path="/average-spending-by-tag"
              element={<AverageSpendingByTag />}
            />
            <Route
              path="/untagged-transactions"
              element={<UntaggedTransactions />}
            />
            <Route path="/totals-by-month" element={<TotalsByMonth />} />
            <Route path="/spending-timeline" element={<SpendingTimeline />} />
            <Route
              path="/monthly-spending-by-tag/:month"
              element={<MonthlySpendingByTag />}
            />
            <Route
              path="/monthly-spending-by-tag"
              element={<MonthlySpendingByTag />}
            />
            <Route
              path="/spending-summary-list"
              element={<SpendingSummaryListPage />}
            />
            <Route
              path="/average-spending-summary"
              element={<CategoryAverageSummaryContainer />}
            />
            <Route
              path="/top-spending-categories/:month"
              element={<TopSpendingCategories />}
            />
            <Route
              path="/top-spending-categories"
              element={<TopSpendingCategories />}
            />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/filters" element={<Filters />} />
          </Routes>
        </PageBody>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const PageBody = styled.article`
  max-width: 632px;
  overflow: scroll;
  padding: 16px;
  width: 100%;
`;

export default Greenbacks;
