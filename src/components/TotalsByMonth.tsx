import { DateTime } from 'luxon';
import React, { FC, Fragment } from 'react';
import {
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from 'recharts';

import Checkboxes from 'components/Checkboxes';
import LoadingIndicator from 'components/LoadingIndicator';
import { Panel, PanelItem } from 'components/Panel';
import SectionContainer from 'components/SectionContainer';
import useMultiselect from 'hooks/useMultiselect';
import useTotalsByMonth, { MonthTotals } from 'hooks/useTotalsByMonth';

const TotalsByMonth: FC<{ area?: string; hasCheckboxes?: boolean }> = ({
  area,
  hasCheckboxes = true,
}) => {
  const categories = [
    'Earning',
    'Earning Minus Saving',
    'Saving',
    'Spending',
    'Saving & Spending',
  ];
  const {
    onChange: onChangeVisibleCategories,
    selectedOptions: visibleCategories,
  } = useMultiselect({
    defaultValue: ['Earning', 'Saving', 'Spending'],
    options: categories,
  });
  const { isLoading, totalsByMonth } = useTotalsByMonth();

  if (isLoading)
    return (
      <SectionContainer
        area={area}
        id="totals-by-month"
        title="Totals by Month"
      >
        <LoadingIndicator name="totals-by-month" />
      </SectionContainer>
    );

  return (
    <SectionContainer area={area} id="totals-by-month">
      <Panel>
        <PanelItem hasBottomBorder>Cash Flow</PanelItem>
        <PanelItem>
          <Graph
            isEarningVisible={visibleCategories.includes('Earning')}
            isEarningMinusSavingVisible={visibleCategories.includes(
              'Earning Minus Saving',
            )}
            isSavingVisible={visibleCategories.includes('Saving')}
            isSavingAndSpendingVisible={visibleCategories.includes(
              'Saving & Spending',
            )}
            isSpendingVisible={visibleCategories.includes('Spending')}
            totalsByMonth={totalsByMonth}
          />
          {hasCheckboxes && (
            <Checkboxes
              label="Categories"
              onChange={onChangeVisibleCategories}
              options={categories}
              selectedOptions={visibleCategories}
            />
          )}
        </PanelItem>
      </Panel>
    </SectionContainer>
  );
};

const Graph: FC<{
  isEarningVisible?: boolean;
  isEarningMinusSavingVisible?: boolean;
  isSavingVisible?: boolean;
  isSavingAndSpendingVisible?: boolean;
  isSpendingVisible?: boolean;
  totalsByMonth?: MonthTotals[];
}> = ({
  isEarningVisible = true,
  isEarningMinusSavingVisible = true,
  isSavingVisible = true,
  isSavingAndSpendingVisible = true,
  isSpendingVisible = true,
  totalsByMonth,
}) => {
  const earliestMonth = totalsByMonth?.[0].month ?? '';
  const latestMonth = totalsByMonth?.[totalsByMonth.length - 1].month ?? '';
  const monthsToLabelBySeriesName = getMonthsToLabel(totalsByMonth);
  return (
    <>
      <div
        data-testid="totals-by-month-graph"
        {...totalsByMonth?.reduce(
          (dataTags, { earning, month, saving, spending }) => {
            const key = `data-month-${month.replace(' ', '-')}`.toLowerCase();
            return {
              ...dataTags,
              [key]: `earning-${earning}-saving-${saving}-spending-${spending}`,
            };
          },
          {},
        )}
      />
      <ResponsiveContainer aspect={4} minWidth={250} width="100%">
        <LineChart data={formatData({ totalsByMonth })}>
          {isEarningVisible && (
            <Line dataKey="earning" dot={false} stroke="green">
              <LabelList
                formatter={formatThousands}
                style={{
                  fontSize: '0.8rem',
                }}
                valueAccessor={(entry: {
                  payload: { month: string };
                  value: number;
                }) => {
                  if (
                    entry.payload.month ===
                    monthsToLabelBySeriesName[Series.Earning]
                  )
                    return entry.value;
                  return null;
                }}
              />
            </Line>
          )}
          {isEarningMinusSavingVisible && (
            <Line
              dataKey="earningMinusSaving"
              dot={false}
              stroke="yellowgreen"
            />
          )}
          {isSavingVisible && (
            <Line dataKey="saving" dot={false} stroke="blue">
              <LabelList
                formatter={formatThousands}
                style={{
                  fontSize: '0.8rem',
                }}
                valueAccessor={(entry: {
                  payload: { month: string };
                  value: number;
                }) => {
                  if (
                    entry.payload.month ===
                    monthsToLabelBySeriesName[Series.Saving]
                  )
                    return entry.value;
                  return null;
                }}
              />
            </Line>
          )}
          {isSpendingVisible && (
            <Line dataKey="spending" dot={false} stroke="orange">
              <LabelList
                formatter={formatThousands}
                style={{
                  fontSize: '0.8rem',
                }}
                valueAccessor={(entry: {
                  payload: { month: string };
                  value: number;
                }) => {
                  if (
                    entry.payload.month ===
                    monthsToLabelBySeriesName[Series.Spending]
                  )
                    return entry.value;
                  return null;
                }}
              />
            </Line>
          )}
          {isSavingAndSpendingVisible && (
            <Line
              dataKey="savingAndSpending"
              dot={false}
              stroke="purple"
              strokeWidth={1}
            />
          )}
          <XAxis
            dataKey="month"
            interval="preserveStartEnd"
            reversed
            tick={{ fontSize: '0.8rem' }}
            tickFormatter={(value) =>
              DateTime.fromISO(value).toLocaleString({
                month: 'short',
                year: 'numeric',
              })
            }
            ticks={[earliestMonth, latestMonth]}
          />
          <Legend
            align="center"
            iconType="plainline"
            wrapperStyle={{ fontSize: '0.8rem' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

const formatData = ({
  totalsByMonth,
}: {
  totalsByMonth?: MonthTotals[];
}): { earning: number; month: string; saving: number; spending: number }[] => {
  if (!totalsByMonth) return [];
  const result = totalsByMonth.map(({ earning, month, saving, spending }) => ({
    earning: earning || 0,
    earningMinusSaving: difference(earning, saving),
    month,
    saving: saving || 0,
    savingAndSpending: sum(saving, spending),
    spending: spending || 0,
  }));
  return result;
};

function sum(a: number | undefined, b: number | undefined): number {
  let total = 0;
  if (a) total += a;
  if (b) total += b;
  return total;
}

function difference(a: number | undefined, b: number | undefined): number {
  let total = 0;
  if (a) total += a;
  if (b) total -= b;
  return total;
}

function formatThousands(cents: number): string {
  const dollars = cents / 100;
  if (Math.abs(dollars) < 1000) return Math.round(dollars).toString();
  const hundreds = Math.round(dollars / 100);
  return `${hundreds / 10}k`;
}

function getMonthsToLabel(
  totals: MonthTotals[] | undefined,
): Partial<Record<Series, string>> {
  if (!totals) return {};
  const monthsToLabel = totals?.reduce(
    (result, monthTotal) => {
      const newResult = { ...result };
      Object.values(Series).forEach((series) => {
        const seriesTotal = monthTotal[series];
        if (!seriesTotal) return;
        if (seriesTotal > result[series]?.maximum)
          newResult[series] = {
            maximum: seriesTotal,
            month: monthTotal.month,
          };
      });
      return newResult;
    },
    {
      earning: { maximum: 0, month: '' },
      saving: { maximum: 0, month: '' },
      spending: { maximum: 0, month: '' },
    },
  );
  return Object.entries(monthsToLabel).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value.month,
    }),
    {},
  );
}

enum Series {
  Earning = 'earning',
  Saving = 'saving',
  Spending = 'spending',
}

export default TotalsByMonth;
