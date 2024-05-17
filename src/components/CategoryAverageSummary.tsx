import { DateTime } from 'luxon';
import React, { useState } from 'react';

import { Button, ButtonStyle } from 'components/Button';
import { Icon, IconType } from 'components/Icon';
import { JustifiedRow as Row, Space } from 'components/JustifiedRow';
import List, { Item } from 'components/List';
import { MonthlyAmountsGraph } from 'components/MonthlyAmountsGraph';
import { Panel, PanelBody } from 'components/Panel';
import { Size, Text } from 'components/Text';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useNow from 'hooks/useNow';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction from 'types/transaction';
import {
  GroupBy,
  groupTransactions,
  SortGroupsBy,
} from 'utils/groupTransactions';
import noop from 'utils/noop';

export function CategoryAverageSummary({
  onChangeVisibleTagCount = noop,
  transactions = [],
  visibleTagCount = 5,
}: {
  onChangeVisibleTagCount?: (input: number) => void;
  transactions?: Transaction[];
  visibleTagCount?: number;
} = {}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  const transactionsByMonth = groupTransactions({
    groupBy: GroupBy.Month,
    transactions,
  });
  if (!transactionsByMonth) return <div>empty</div>;
  const graphData = {
    Spending: transactionsByMonth
      .map((group) => ({
        amount: group.total,
        month: DateTime.fromISO(group.key),
      }))
      .sort((a, b) => (a.month > b.month ? 1 : -1)),
  };
  const averageMonthlySpending =
    transactionsByMonth.reduce((result, group) => result + group.total, 0) / 12;
  const transactionsByTag = groupTransactions({
    groupBy: GroupBy.Tag,
    sortGroupsBy: SortGroupsBy.Total,
    transactions,
  });
  const transactionsByTagAndMonth = transactionsByTag?.map<{
    average: number;
    tag: string;
  }>((group) => {
    const tagTransactionsByMonth = groupTransactions({
      groupBy: GroupBy.Month,
      transactions: group.transactions,
    });
    return {
      average: group.total / 12,
      tag: group.key,
      groupedTransactions: tagTransactionsByMonth,
    };
  });
  const allTags = Object.keys(transactionsByTag ?? {});
  const visibleTransactionGroups =
    transactionsByTagAndMonth?.slice(0, visibleTagCount) ?? [];
  const remainingTagAmount = (
    transactionsByTagAndMonth?.slice(visibleTagCount, allTags.length) ?? []
  ).reduce((sum, group) => sum + group.average, 0);
  return (
    <Panel>
      <PanelBody hasBottomBorder>
        <Text size={Size.Small}>On average each month you&apos;ve spent</Text>
        <Text size={Size.Large}>{format(averageMonthlySpending)}</Text>
      </PanelBody>
      <PanelBody hasBottomBorder>
        <MonthlyAmountsGraph
          hasLegend={false}
          monthlyAmountsBySeriesName={graphData}
        />
      </PanelBody>
      <List
        hasOutsideBorder={false}
        hasRoundedBottomCorners
        hasRoundedTopCorners={false}
      >
        {visibleTransactionGroups &&
          visibleTransactionGroups.map(({ average, tag }) => (
            <Item key={tag}>
              <Row>
                <Text>{format(average)}</Text>
                <Text isUnderlined size={Size.Small}>
                  {tag}
                </Text>
              </Row>
            </Item>
          ))}
        {remainingTagAmount > 0 && (
          <Item>
            <Row>
              <Text>{format(remainingTagAmount)}</Text>
              <Text isUnderlined size={Size.Small}>
                All other transactions
              </Text>
            </Row>
          </Item>
        )}
        <Item>
          <TagVisibilityController
            onChangeVisibleTagCount={onChangeVisibleTagCount}
            totalTagCount={allTags.length}
            visibleTagCount={visibleTagCount}
          />
        </Item>
      </List>
    </Panel>
  );
}

function TagVisibilityController({
  onChangeVisibleTagCount = noop,
  totalTagCount,
  visibleTagCount,
}: {
  onChangeVisibleTagCount?: (input: number) => void;
  totalTagCount: number;
  visibleTagCount: number;
}): React.ReactElement {
  const actualVisibleTagCount = Math.max(
    Math.min(visibleTagCount, totalTagCount),
    1
  );
  const canIncreaseVisibleTagCount = totalTagCount > actualVisibleTagCount;
  const canDecreaseVisibleTagCount = actualVisibleTagCount > 1;
  return (
    <Row>
      <Text size={Size.Small}>
        {actualVisibleTagCount} of {totalTagCount} tags visible
      </Text>
      <Row space={Space.Small}>
        {canIncreaseVisibleTagCount && (
          <Button
            isDisabled={!canIncreaseVisibleTagCount}
            onClick={() => {
              onChangeVisibleTagCount(actualVisibleTagCount + 1);
            }}
            style={ButtonStyle.Unstyled}
          >
            <Icon icon={IconType.Plus} />
          </Button>
        )}
        {canDecreaseVisibleTagCount && (
          <Button
            onClick={() => {
              onChangeVisibleTagCount(actualVisibleTagCount - 1);
            }}
            style={ButtonStyle.Unstyled}
          >
            <Icon icon={IconType.Minus} />
          </Button>
        )}
      </Row>
    </Row>
  );
}

export function CategoryAverageSummaryContainer(): React.ReactElement {
  const { now } = useNow();
  const [visibleTagCount, onChangeVisibleTagCount] = useState<number>(5);
  const endDate = now.minus({ months: 1 }).endOf('month').toISODate();
  const startDate = now.minus({ years: 1 }).startOf('month').toISODate();
  const { spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  return (
    <CategoryAverageSummary
      onChangeVisibleTagCount={onChangeVisibleTagCount}
      transactions={spending}
      visibleTagCount={visibleTagCount}
    />
  );
}
