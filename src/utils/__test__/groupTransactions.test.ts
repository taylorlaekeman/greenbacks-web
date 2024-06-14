import { buildTransaction } from '__test__/utils/buildTransaction';
import groupTransactions, {
  GroupBy,
  SortDirection,
  SortGroupsBy,
  SortTransactionsBy,
} from 'utils/groupTransactions';
import { Category } from 'types/transaction';

test('returns undefined if transactions are undefined', () => {
  expect(
    groupTransactions({
      transactions: undefined,
    }),
  ).toBe(undefined);
});

test('groups transactions by date', () => {
  const transactions = [
    buildTransaction({ amount: 100, datetime: '2020-01-01' }),
    buildTransaction({ amount: 100, datetime: '2020-01-01' }),
    buildTransaction({ amount: 100, datetime: '2020-01-02' }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Date,
    sortGroupsDirection: SortDirection.Asc,
    transactions,
  });
  expect(groupedTransactions?.[0].key).toBe('2020-01-01');
  expect(groupedTransactions?.[0].total).toBe(200);
  expect(groupedTransactions?.[0].transactions[0]).toBe(transactions[0]);
  expect(groupedTransactions?.[0].transactions[1]).toBe(transactions[1]);
  expect(groupedTransactions?.[1].key).toBe('2020-01-02');
  expect(groupedTransactions?.[1].total).toBe(100);
  expect(groupedTransactions?.[1].transactions[0]).toBe(transactions[2]);
});

test('groups transactions by tag', () => {
  const transactions = [
    buildTransaction({ amount: 100, tag: 'first' }),
    buildTransaction({ amount: 100, tag: 'first' }),
    buildTransaction({ amount: 100, tag: 'second' }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Tag,
    sortGroupsDirection: SortDirection.Asc,
    transactions,
  });
  expect(groupedTransactions?.[0].key).toBe('first');
  expect(groupedTransactions?.[0].total).toBe(200);
  expect(groupedTransactions?.[0].transactions[0]).toBe(transactions[0]);
  expect(groupedTransactions?.[0].transactions[1]).toBe(transactions[1]);
  expect(groupedTransactions?.[1].key).toBe('second');
  expect(groupedTransactions?.[1].total).toBe(100);
  expect(groupedTransactions?.[1].transactions[0]).toBe(transactions[2]);
});

test('groups transactions by category', () => {
  const transactions = [
    buildTransaction({ amount: 100, category: Category.Spending }),
    buildTransaction({ amount: 100, category: Category.Spending }),
    buildTransaction({ amount: 100, category: Category.Saving }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Category,
    transactions,
  });
  expect(groupedTransactions?.[0].key).toBe(Category.Spending);
  expect(groupedTransactions?.[0].total).toBe(200);
  expect(groupedTransactions?.[0].transactions[0]).toBe(transactions[0]);
  expect(groupedTransactions?.[0].transactions[1]).toBe(transactions[1]);
  expect(groupedTransactions?.[1].key).toBe(Category.Saving);
  expect(groupedTransactions?.[1].total).toBe(100);
  expect(groupedTransactions?.[1].transactions[0]).toBe(transactions[2]);
});

test('sorts groups by key', () => {
  const transactions = [
    buildTransaction({ amount: 100, datetime: '2020-01-01' }),
    buildTransaction({ amount: 100, datetime: '2020-01-01' }),
    buildTransaction({ amount: 100, datetime: '2020-01-02' }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Date,
    sortGroupsBy: SortGroupsBy.Key,
    transactions,
  });
  expect(groupedTransactions?.[0].key).toBe('2020-01-02');
  expect(groupedTransactions?.[1].key).toBe('2020-01-01');
});

test('sorts groups by total', () => {
  const transactions = [
    buildTransaction({ amount: 100, datetime: '2020-01-01' }),
    buildTransaction({ amount: 300, datetime: '2020-01-02' }),
    buildTransaction({ amount: 200, datetime: '2020-01-03' }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Date,
    sortGroupsBy: SortGroupsBy.Total,
    transactions,
  });
  expect(groupedTransactions?.[0].key).toBe('2020-01-02');
  expect(groupedTransactions?.[1].key).toBe('2020-01-03');
  expect(groupedTransactions?.[2].key).toBe('2020-01-01');
});

test('sorts groups ascending', () => {
  const transactions = [
    buildTransaction({ amount: 100, datetime: '2020-01-01' }),
    buildTransaction({ amount: 100, datetime: '2020-01-01' }),
    buildTransaction({ amount: 100, datetime: '2020-01-02' }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Date,
    sortGroupsBy: SortGroupsBy.Key,
    sortGroupsDirection: SortDirection.Asc,
    transactions,
  });
  expect(groupedTransactions?.[0].key).toBe('2020-01-01');
  expect(groupedTransactions?.[1].key).toBe('2020-01-02');
});

test('sorts transactions by date', () => {
  const transactions = [
    buildTransaction({ datetime: '2020-01-01', tag: 'first' }),
    buildTransaction({ datetime: '2020-01-02', tag: 'first' }),
    buildTransaction({ datetime: '2020-01-03', tag: 'first' }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Tag,
    sortTransactionsBy: SortTransactionsBy.Date,
    transactions,
  });
  expect(groupedTransactions?.[0].transactions[0]).toBe(transactions[2]);
  expect(groupedTransactions?.[0].transactions[1]).toBe(transactions[1]);
  expect(groupedTransactions?.[0].transactions[2]).toBe(transactions[0]);
});

test('sorts transactions by amount', () => {
  const transactions = [
    buildTransaction({ amount: 100, tag: 'first' }),
    buildTransaction({ amount: 200, tag: 'first' }),
    buildTransaction({ amount: 300, tag: 'first' }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Tag,
    sortTransactionsBy: SortTransactionsBy.Amount,
    transactions,
  });
  expect(groupedTransactions?.[0].transactions[0]).toBe(transactions[2]);
  expect(groupedTransactions?.[0].transactions[1]).toBe(transactions[1]);
  expect(groupedTransactions?.[0].transactions[2]).toBe(transactions[0]);
});

test('sorts transactions ascending', () => {
  const transactions = [
    buildTransaction({ amount: 100, datetime: '2020-01-01', tag: 'first' }),
    buildTransaction({ amount: 100, datetime: '2020-01-02', tag: 'first' }),
    buildTransaction({ amount: 100, datetime: '2020-01-03', tag: 'first' }),
  ];
  const groupedTransactions = groupTransactions({
    groupBy: GroupBy.Tag,
    sortTransactionsBy: SortTransactionsBy.Date,
    sortTransactionsDirection: SortDirection.Asc,
    transactions,
  });
  expect(groupedTransactions?.[0].transactions[0]).toBe(transactions[0]);
  expect(groupedTransactions?.[0].transactions[1]).toBe(transactions[1]);
  expect(groupedTransactions?.[0].transactions[2]).toBe(transactions[2]);
});
