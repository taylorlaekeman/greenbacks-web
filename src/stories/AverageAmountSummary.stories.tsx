import type { Meta, StoryObj } from '@storybook/react';

import { AverageAmountSummary } from 'components/AverageAmountSummary';
import { transactionsYearBeforeMay2024 } from 'stories/testTransactions';

const meta: Meta<React.ComponentProps<typeof AverageAmountSummary>> = {
  args: {
    expandedTag: 'Groceries',
    transactions: transactionsYearBeforeMay2024,
    visibleTagCount: 5,
  },
  component: AverageAmountSummary,
  parameters: {
    layout: 'centered',
  },
  title: 'Molecules/AverageAmountSummary',
};

type Story = StoryObj<typeof AverageAmountSummary>;

export const Default: Story = {};

export default meta;
