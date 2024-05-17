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
  Group,
  GroupBy,
  groupTransactions,
  SortGroupsBy,
} from 'utils/groupTransactions';
import noop from 'utils/noop';

export function CategoryAverageSummary({
  expandedTag,
  onChangeVisibleTagCount = noop,
  onSelectTag = noop,
  transactions = [],
  visibleTagCount = 5,
}: {
  expandedTag?: string;
  onChangeVisibleTagCount?: (input: number) => void;
  onSelectTag?: (input: string | undefined) => void;
  transactions?: Transaction[];
  visibleTagCount?: number;
} = {}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  const transactionsByMonth = groupTransactions({
    groupBy: GroupBy.Month,
    transactions,
  });
  if (!transactionsByMonth) return <div>empty</div>;
  const graphData = formatGroupsForGraph({
    groups: transactionsByMonth,
    seriesName: 'Spending',
  });
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
    transactionsByMonth: Group[];
  }>((group) => {
    const tagTransactionsByMonth = groupTransactions({
      groupBy: GroupBy.Month,
      transactions: group.transactions,
    });
    return {
      average: group.total / 12,
      tag: group.key,
      transactionsByMonth: tagTransactionsByMonth ?? [],
    };
  });
  const allTags = Object.keys(transactionsByTag ?? {});
  const visibleTransactionGroups =
    transactionsByTagAndMonth?.slice(0, visibleTagCount) ?? [];
  const remainingTagsAmount = (
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
          visibleTransactionGroups.map(
            ({ average, tag, transactionsByMonth: transactionGroups }) => (
              <ExpandableTagAmount
                amount={average}
                isExpanded={expandedTag === tag}
                key={tag}
                onCollapse={() => onSelectTag(undefined)}
                onExpand={() => onSelectTag(tag)}
                tag={tag}
                transactionsByMonth={transactionGroups}
              />
            )
          )}
        {remainingTagsAmount > 0 && (
          <ExpandableTagAmount
            amount={remainingTagsAmount}
            tag="All other transactions"
          />
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

function formatGroupsForGraph({
  groups,
  seriesName,
}: {
  groups: Group[];
  seriesName: string;
}) {
  return {
    [seriesName]: groups
      .map((group) => ({
        amount: group.total,
        month: DateTime.fromISO(group.key),
      }))
      .sort((a, b) => (a.month > b.month ? 1 : -1)),
  };
}

function ExpandableTagAmount({
  amount,
  isExpanded = false,
  onCollapse = noop,
  onExpand = noop,
  tag,
  transactionsByMonth = [],
}: {
  amount: number;
  isExpanded?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
  tag: string;
  transactionsByMonth?: Group[];
}): React.ReactElement {
  const formattedGroups = formatGroupsForGraph({
    groups: transactionsByMonth,
    seriesName: tag,
  });
  if (!isExpanded)
    return (
      <Item>
        <ExpandableTagAmountHeader
          amount={amount}
          isExpanded={isExpanded}
          onClick={onExpand}
          tag={tag}
        />
      </Item>
    );
  return (
    <Item hasPadding={false}>
      <Panel hasBorder={false}>
        <PanelBody hasBottomBorder>
          <ExpandableTagAmountHeader
            amount={amount}
            isExpanded={isExpanded}
            onClick={onCollapse}
            tag={tag}
          />
        </PanelBody>
        <PanelBody isInset>
          <MonthlyAmountsGraph
            hasLegend={false}
            monthlyAmountsBySeriesName={formattedGroups}
          />
        </PanelBody>
      </Panel>
    </Item>
  );
}

function ExpandableTagAmountHeader({
  amount,
  isExpanded = false,
  onClick = noop,
  tag,
}: {
  amount: number;
  isExpanded?: boolean;
  onClick?: () => void;
  tag: string;
}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  return (
    <Button isFullWidth onClick={onClick} style={ButtonStyle.Unstyled}>
      <Row>
        <Text isBold={isExpanded}>{format(amount)}</Text>
        <Text isBold={isExpanded} isUnderlined size={Size.Small}>
          {tag}
        </Text>
      </Row>
    </Button>
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
