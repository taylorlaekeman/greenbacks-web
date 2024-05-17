import type { Meta, StoryObj } from '@storybook/react';

import { CategoryAverageSummary } from 'components/CategoryAverageSummary';
import { transactionsYearBeforeMay2024 } from 'stories/testTransactions';

const meta: Meta<React.ComponentProps<typeof CategoryAverageSummary>> = {
  args: {
    expandedTag: 'Groceries',
    transactions: transactionsYearBeforeMay2024,
    visibleTagCount: 5,
  },
  component: CategoryAverageSummary,
  parameters: {
    layout: 'centered',
  },
  title: 'Molecules/CategoryAverageSummary',
};

type Story = StoryObj<typeof CategoryAverageSummary>;

export const Default: Story = {};

export default meta;
