import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { SpendingSummaryList } from 'components/SpendingSummaryList';
import { transactions } from 'stories/testTransactions';
import datetime from 'utils/datetime';

type Args = React.ComponentProps<typeof SpendingSummaryList> & {
  endDate: string;
  expandedTag?: string;
  month: string;
  startDate: string;
};

const meta: Meta<Args> = {
  args: {
    areAllTagsVisible: false,
    comparisonSpendingByDate: {
      '2024-05-01': 30000,
      '2024-05-03': 30000,
      '2024-05-05': 30000,
      '2024-05-06': 30000,
      '2024-05-08': 30000,
      '2024-05-10': 30000,
      '2024-05-12': 30000,
      '2024-05-13': 30000,
      '2024-05-14': 30000,
      '2024-05-15': 30000,
      '2024-05-18': 30000,
      '2024-05-19': 30000,
      '2024-05-21': 30000,
      '2024-05-22': 30000,
      '2024-05-23': 30000,
      '2024-05-25': 30000,
      '2024-05-26': 30000,
      '2024-05-28': 30000,
      '2024-05-29': 30000,
      '2024-05-31': 30000,
    },
    endDate: undefined,
    expandedTag: undefined,
    isCurrentMonth: false,
    month: undefined,
    onSelectTag: fn(),
    startDate: undefined,
    transactions,
    visibleTagCount: 5,
  },
  argTypes: {
    endDate: {
      control: 'text',
    },
    month: {
      control: 'text',
    },
    startDate: {
      control: 'text',
    },
  },
  component: SpendingSummaryList,
  parameters: {
    layout: 'centered',
  },
  render: (args) => <StoryWrapper {...args} />,
  title: 'Molecules/SpendingSummaryList',
};

function StoryWrapper(props: Args): React.ReactElement {
  const { expandedTag: initialExpandedTag } = props;
  const [expandedTag, setExpandedTag] = useState<string | undefined>(
    initialExpandedTag
  );
  const [visibleTagCount, setVisibleTagCount] = useState<number>(5);
  const { endDate, month, startDate } = props;
  const parsedEndDate: datetime | undefined =
    endDate && datetime.fromISO(endDate);
  const parsedStartDate: datetime | undefined =
    startDate && datetime.fromISO(startDate);
  const parsedMonth: datetime | undefined = month && datetime.fromISO(month);
  return (
    <SpendingSummaryList
      {...props}
      endDate={parsedEndDate}
      expandedTag={expandedTag}
      month={parsedMonth}
      onChangeVisibleTagCount={setVisibleTagCount}
      onSelectTag={(tag) => setExpandedTag(tag)}
      startDate={parsedStartDate}
      visibleTagCount={visibleTagCount}
    />
  );
}

type Story = StoryObj<typeof SpendingSummaryList>;

export const ThisMonth: Story = {
  args: {
    isCurrentMonth: true,
  },
};

export const SpecificMonth: Story = {
  args: {
    month: datetime.fromISO('2024-01'),
  },
};

export const DateRange: Story = {
  args: {
    endDate: datetime.fromISO('2024-01-10'),
    startDate: datetime.fromISO('2024-01-01'),
  },
};

export const StartDate: Story = {
  args: {
    startDate: datetime.fromISO('2024-01-01'),
  },
};

export const AllTagsVisible: Story = {
  args: {
    areAllTagsVisible: true,
    isCurrentMonth: true,
  },
};

export const Expanded: Story = {
  args: {
    expandedTag: 'Untagged',
    isCurrentMonth: true,
  },
};

export const NoTransactions: Story = {
  args: {
    isCurrentMonth: true,
    transactions: undefined,
  },
};

export default meta;
