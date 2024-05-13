import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SpendingSummaryListPage } from 'components/SpendingSummaryListPage';
import { TestGreenbacksProvider } from 'context/Greenbacks';
// import { transactions } from 'stories/testTransactions';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';

const meta: Meta<typeof SpendingSummaryListPage> = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <TestGreenbacksProvider
      mocks={[
        buildApiTransactionsMock({
          endDate: '2020-01-31',
          startDate: '2020-01-01',
          transactions: [
            buildTransaction({
              amount: 100,
              datetime: '2020-01-01',
              name: 'Transaction 1',
            }),
            buildTransaction({
              amount: 200,
              datetime: '2020-01-01',
              name: 'Transaction 2',
            }),
            buildTransaction({
              amount: 300,
              datetime: '2020-01-01',
              name: 'Transaction 3',
            }),
          ],
        }),
      ]}
      now="2020-01-01"
    >
      <SpendingSummaryListPage />
    </TestGreenbacksProvider>
  ),
  title: 'Pages/SpendingSummaryList',
};

type Story = StoryObj<typeof SpendingSummaryListPage>;

export const Default: Story = {};

export default meta;
