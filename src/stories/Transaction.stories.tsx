import type { Meta, StoryObj } from '@storybook/react';

import Transaction from 'components/Transaction';
import { transactions } from 'stories/testTransactions';

const meta: Meta<typeof Transaction> = {
  args: {
    isDateVisible: undefined,
    isFilteringEnabled: undefined,
    transaction: transactions[0],
  },
  component: Transaction,
  parameters: {
    layout: 'centered',
  },
  title: 'Molecules/Transaction',
};

type Story = StoryObj<typeof Transaction>;

export const Default: Story = {
  args: {},
};

export const Filterable: Story = {
  args: {
    isFilteringEnabled: true,
  },
};

export const Compact: Story = {
  args: {
    isCompact: true
  },
};

export default meta;
