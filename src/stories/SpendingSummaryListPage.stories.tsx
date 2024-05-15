import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SpendingSummaryListPage } from 'components/SpendingSummaryListPage';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import { transactions } from 'stories/testTransactions';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';

const meta: Meta<typeof SpendingSummaryListPage> = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <TestGreenbacksProvider
      mocks={[
        buildApiTransactionsMock({
          endDate: '2024-05-31',
          startDate: '2024-05-01',
          transactions,
        }),
        buildApiTransactionsMock({
          endDate: '2024-04-30',
          startDate: '2023-05-01',
          transactions: [
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
          ],
        }),
      ]}
      now="2024-05-06"
    >
      <SpendingSummaryListPage />
    </TestGreenbacksProvider>
  ),
  title: 'Pages/SpendingSummaryList',
};

type Story = StoryObj<typeof SpendingSummaryListPage>;

export const Default: Story = {};

export default meta;
