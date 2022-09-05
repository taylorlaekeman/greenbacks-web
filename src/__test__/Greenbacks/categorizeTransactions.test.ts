import { categorizeTransactions } from 'hooks/useRawTransactions';
import buildTransaction from '__test__/utils/buildTransaction';

test('returns undefined if transactions are undefined', () => {
  const { credits, debits, transfers } = categorizeTransactions();
  expect(credits).toBeUndefined();
  expect(debits).toBeUndefined();
  expect(transfers).toBeUndefined();
});

test('identifies credit', () => {
  const transactions = [buildTransaction({ accountId: '1', amount: -1 })];
  const { credits, debits, transfers } = categorizeTransactions({
    transactions,
  });
  expect(credits).toHaveLength(1);
  expect(debits).toHaveLength(0);
  expect(transfers).toHaveLength(0);
  expect(credits?.[0].amount).toBe(1);
});

test('identifies debit', () => {
  const transactions = [buildTransaction({ accountId: '1', amount: 1 })];
  const { credits, debits, transfers } = categorizeTransactions({
    transactions,
  });
  expect(credits).toHaveLength(0);
  expect(debits).toHaveLength(1);
  expect(transfers).toHaveLength(0);
  expect(debits?.[0].amount).toBe(1);
});

test('identifies transfer', () => {
  const transactions = [
    buildTransaction({ accountId: '1', amount: 1 }),
    buildTransaction({ accountId: '2', amount: -1 }),
  ];
  const { credits, debits, transfers } = categorizeTransactions({
    transactions,
  });
  expect(credits).toHaveLength(0);
  expect(debits).toHaveLength(0);
  expect(transfers).toHaveLength(1);
  expect(transfers?.[0].amount).toBe(1);
  expect(transfers?.[0].sourceAccountId).toBe('1');
  expect(transfers?.[0].destinationAccountId).toBe('2');
});

test('identifies two transfers with same amount', () => {
  const transactions = [
    buildTransaction({ accountId: '1', amount: 1 }),
    buildTransaction({ accountId: '2', amount: -1 }),
    buildTransaction({ accountId: '1', amount: 1 }),
    buildTransaction({ accountId: '2', amount: -1 }),
  ];
  const { credits, debits, transfers } = categorizeTransactions({
    transactions,
  });
  expect(credits).toHaveLength(0);
  expect(debits).toHaveLength(0);
  expect(transfers).toHaveLength(2);
  expect(transfers?.[0].amount).toBe(1);
  expect(transfers?.[0].sourceAccountId).toBe('1');
  expect(transfers?.[0].destinationAccountId).toBe('2');
  expect(transfers?.[1].amount).toBe(1);
  expect(transfers?.[1].sourceAccountId).toBe('1');
  expect(transfers?.[1].destinationAccountId).toBe('2');
});

test('identifies two transfers with different amounts', () => {
  const transactions = [
    buildTransaction({ accountId: '1', amount: 1 }),
    buildTransaction({ accountId: '2', amount: -1 }),
    buildTransaction({ accountId: '1', amount: 2 }),
    buildTransaction({ accountId: '2', amount: -2 }),
  ];
  const { credits, debits, transfers } = categorizeTransactions({
    transactions,
  });
  expect(credits).toHaveLength(0);
  expect(debits).toHaveLength(0);
  expect(transfers).toHaveLength(2);
  expect(transfers?.[0].amount).toBe(1);
  expect(transfers?.[0].sourceAccountId).toBe('1');
  expect(transfers?.[0].destinationAccountId).toBe('2');
  expect(transfers?.[1].amount).toBe(2);
  expect(transfers?.[1].sourceAccountId).toBe('1');
  expect(transfers?.[1].destinationAccountId).toBe('2');
});

test('does not identify complementary transactions from same account as transfer', () => {
  const transactions = [
    buildTransaction({ accountId: '1', amount: 1 }),
    buildTransaction({ accountId: '1', amount: -1 }),
  ];
  const { credits, debits, transfers } = categorizeTransactions({
    transactions,
  });
  expect(credits).toHaveLength(1);
  expect(debits).toHaveLength(1);
  expect(transfers).toHaveLength(0);
});
