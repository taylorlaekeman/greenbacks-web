import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { v4 as generateUuid } from 'uuid';

import {
  NewFilterModal,
  NewFilterModalContainer,
} from 'components/NewFilterModal';
import { TestFiltersProvider } from 'context/Filters';
import type { Filter } from 'types/filter';
import GreenbacksTransaction, {
  Category,
  TransactionType,
} from 'types/transaction';

const transaction: GreenbacksTransaction = {
  accountId: 'account-1',
  amount: 3599,
  category: Category.Spending,
  datetime: '2020-01-01',
  id: 'transaction-1',
  merchant: 'Merchant 1',
  name: 'Transaction 1',
  type: TransactionType.Debit,
};

const meta: Meta<typeof NewFilterModal> = {
  args: {
    onClose: fn(),
    transaction,
  },
  component: NewFilterModal,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Molecules/NewFilterModal',
};

type Story = StoryObj<typeof NewFilterModal>;

export const Default: Story = {};

export const InContainer: Story = {
  render: (args) => (
    <TestFiltersProvider
      filters={[
        buildFilter('Rent'),
        buildFilter('Groceries'),
        buildFilter('Groceries'),
        buildFilter('Groceries'),
        buildFilter('Groceries'),
        buildFilter('Groceries'),
        buildFilter('Entertainment'),
        buildFilter('Entertainment'),
        buildFilter('Entertainment'),
        buildFilter('Entertainment'),
        buildFilter('Entertainment'),
        buildFilter('Entertainment'),
        buildFilter('Entertainment'),
        buildFilter('Restaurants'),
        buildFilter('Restaurants'),
        buildFilter('Restaurants'),
        buildFilter('Internet'),
        buildFilter('Phone'),
      ]}
    >
      <NewFilterModalContainer {...args} />
    </TestFiltersProvider>
  ),
};

function buildFilter(tag: string): Filter {
  return {
    categoryToAssign: Category.Spending,
    id: generateUuid(),
    matchers: [],
    tagToAssign: tag,
  };
}

export default meta;
