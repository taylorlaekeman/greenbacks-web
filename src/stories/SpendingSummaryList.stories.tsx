import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SpendingSummaryList } from 'components/SpendingSummaryList';
import { transactions } from 'stories/testTransactions';
import datetime from 'utils/datetime';

type Args = React.ComponentProps<typeof SpendingSummaryList> & {
  endDate: string;
  month: string;
  startDate: string;
};

const meta: Meta<Args> = {
  args: {
    areAllTagsVisible: false,
    endDate: undefined,
    isCurrentMonth: false,
    month: undefined,
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
  render: (args) => {
    const { endDate, month, startDate } = args;
    const parsedEndDate: datetime | undefined =
      endDate && datetime.fromISO(endDate);
    const parsedStartDate: datetime | undefined =
      startDate && datetime.fromISO(startDate);
    const parsedMonth: datetime | undefined = month && datetime.fromISO(month);
    return (
      <SpendingSummaryList
        {...args}
        endDate={parsedEndDate}
        month={parsedMonth}
        startDate={parsedStartDate}
      />
    );
  },
  title: 'Molecules/SpendingSummaryList',
};

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

export default meta;
