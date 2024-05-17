import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CategoryAverageSummaryContainer } from 'components/CategoryAverageSummary';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import { transactionsYearBeforeMay2024 } from 'stories/testTransactions';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';

const meta: Meta<typeof CategoryAverageSummaryContainer> = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <TestGreenbacksProvider
      mocks={[
        buildApiTransactionsMock({
          endDate: '2024-04-30',
          startDate: '2023-05-01',
          transactions: transactionsYearBeforeMay2024,
        }),
      ]}
      now="2024-05-01"
    >
      <CategoryAverageSummaryContainer />
    </TestGreenbacksProvider>
  ),
  title: 'Pages/CategoryAverageSummaryContainer',
};

type Story = StoryObj<typeof CategoryAverageSummaryContainer>;

export const Default: Story = {};

export default meta;
