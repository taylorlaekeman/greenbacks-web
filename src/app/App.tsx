import React, { FunctionComponent } from 'react';

import Greenbacks from 'components/Greenbacks';
import AccountConnectionProvider from 'context/AccountConnection';
import AuthProvider from 'context/Auth';
import { FiltersProvider } from 'context/Filters';
import GreenbacksApiProvider from 'context/GreenbacksApi';
import RouteProvider from 'context/Route';
import env from 'env';
import GlobalStyle from 'styles/GlobalStyle';
import { Comparator } from 'types/filter';
import { Category, CoreTransaction as Transaction } from 'types/transaction';
import styled from 'utils/styled';

const App: FunctionComponent = () => (
  <AuthProvider>
    <GreenbacksApiProvider uri={`${env.apiHost}/graphql`}>
      <AccountConnectionProvider>
        <FiltersProvider filters={FILTERS}>
          <RouteProvider>
            <GlobalStyle />
            <Wrapper>
              <Greenbacks />
            </Wrapper>
          </RouteProvider>
        </FiltersProvider>
      </AccountConnectionProvider>
    </GreenbacksApiProvider>
  </AuthProvider>
);

const Wrapper = styled.div`
  height: 100vh;
`;

const FILTERS = [
  {
    categoryToAssign: Category.Saving,
    id: 'test-filter-id-1',
    matchers: [
      {
        expectedValue: 'EFT Withdrawal to CDN SHR INVEST',
        property: 'name' as keyof Transaction,
      },
    ],
    tagToAssign: 'retirement',
  },
  {
    categoryToAssign: Category.Saving,
    id: 'test-filter-id-2',
    matchers: [
      {
        expectedValue: 'EFT Withdrawal to WSII',
        property: 'name' as keyof Transaction,
      },
    ],
    tagToAssign: 'retirement',
  },
  {
    categoryToAssign: Category.Saving,
    id: 'test-filter-id-2',
    matchers: [
      {
        expectedValue: 'EFT Withdrawal to WS Investments',
        property: 'name' as keyof Transaction,
      },
    ],
    tagToAssign: 'retirement',
  },
  {
    categoryToAssign: Category.Saving,
    id: 'test-filter-id-3',
    matchers: [
      {
        expectedValue:
          'Recurring Internet Withdrawal to Tangerine Savings Account - Down Payment - 3037686588',
        property: 'name' as keyof Transaction,
      },
    ],
    tagToAssign: 'down payment',
  },
  {
    categoryToAssign: Category.Spending,
    id: 'test-filter-id-4',
    matchers: [
      {
        expectedValue: 'FARM BOY',
        property: 'name' as keyof Transaction,
      },
    ],
    tagToAssign: 'Groceries',
  },
  {
    categoryToAssign: Category.Spending,
    id: 'test-filter-id-5',
    matchers: [
      {
        expectedValue: 'METRO',
        property: 'name' as keyof Transaction,
      },
    ],
    tagToAssign: 'Groceries',
  },
  {
    categoryToAssign: Category.Spending,
    id: 'test-filter-id-5',
    matchers: [
      {
        expectedValue: 'INTERAC e-Transfer To: Avrom Sud',
        property: 'name' as keyof Transaction,
      },
    ],
    tagToAssign: 'Rent',
  },
];

export default App;
