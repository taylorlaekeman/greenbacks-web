import { DateTime } from 'luxon';
import { v4 as getUuid } from 'uuid';

import type { CoreTransaction } from 'types/transaction';

export function generateTransactions({
  endDate,
  startDate,
}: {
  endDate: DateTime;
  startDate: DateTime;
}): CoreTransaction[] {
  let results: CoreTransaction[] = [];
  for (
    let date = startDate.startOf('month');
    date <= endDate;
    date = date.plus({ months: 1 })
  ) {
    const monthTransactions = generateTransactionsForMonth({ month: date });
    results = [...results, ...monthTransactions];
  }
  return results;
}

function generateTransactionsForMonth({
  month,
}: {
  month: DateTime;
}): CoreTransaction[] {
  const groceryAmountRange = { maxAmount: 20000, minAmount: 1000 };
  const groceryTransactions = [
    generateRandomizedTransaction({
      merchant: 'Hello Fresh',
      month,
      index: 1,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Hello Fresh',
      month,
      index: 2,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Hello Fresh',
      month,
      index: 3,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Hello Fresh',
      month,
      index: 4,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Toronto Market',
      month,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Loblaws',
      month,
      index: 1,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Loblaws',
      month,
      index: 2,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Loblaws',
      month,
      index: 3,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: "Shopper's Drugmart",
      month,
      index: 1,
      ...groceryAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: "Shopper's Drugmart",
      month,
      index: 2,
      ...groceryAmountRange,
    }),
  ];
  const restaurantAmountRange = { maxAmount: 10000, minAmount: 1000 };
  const restaurantTransactions = [
    generateRandomizedTransaction({
      merchant: 'A&W',
      month,
      ...restaurantAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Yonge Sushi',
      month,
      ...restaurantAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Neighbourhood Pizza',
      month,
      ...restaurantAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Burrito King',
      month,
      index: 1,
      ...restaurantAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Burrito King',
      month,
      index: 2,
      ...restaurantAmountRange,
    }),
  ];
  const transportationAmountRange = {
    maxAmount: 2000,
    minAmount: 300,
  };
  const transportationTransactions = [
    generateRandomizedTransaction({
      merchant: 'Esso',
      month,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Go Transit',
      month,
      index: 1,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Go Transit',
      month,
      index: 2,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 1,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 2,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 3,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 4,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 5,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 6,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 7,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 8,
      ...transportationAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'TTC',
      month,
      index: 9,
      ...transportationAmountRange,
    }),
  ];
  const entertainmentAmountRange = {
    maxAmount: 5000,
    minAmount: 2000,
  };
  const entertainmentTransactions = [
    generateRandomizedTransaction({
      merchant: 'Cineplex',
      month,
      ...entertainmentAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Nintendo',
      month,
      ...entertainmentAmountRange,
    }),
  ];
  const miscAmountRange = {
    maxAmount: 10000,
    minAmount: 1000,
  };
  const miscTransactions = [
    generateRandomizedTransaction({
      merchant: 'Amazon',
      month,
      index: 1,
      ...miscAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Amazon',
      month,
      index: 2,
      ...miscAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Walmart',
      month,
      index: 1,
      ...miscAmountRange,
    }),
    generateRandomizedTransaction({
      merchant: 'Walmart',
      month,
      index: 2,
      ...miscAmountRange,
    }),
  ];
  const randomizedSpending = [
    ...groceryTransactions,
    ...restaurantTransactions,
    ...transportationTransactions,
    ...entertainmentTransactions,
    ...miscTransactions,
  ];
  const creditCardTotal = randomizedSpending.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  return [
    ...randomizedSpending,
    getTransaction({
      accountId: 'account-1',
      amount: 200000,
      datetime: month.toISODate(),
      id: `${month.toUnixInteger()}-TD-TransferToLandlord`,
      merchant: 'TD',
      name: 'Transfer to Landlord',
    }),
    getTransaction({
      accountId: 'account-1',
      amount: 2000,
      datetime: month.plus({ days: 25 }).toISODate(),
      id: `${month.toUnixInteger()}-Netflix`,
      merchant: 'Netflix',
      name: 'Netflix',
    }),
    getTransaction({
      accountId: 'account-1',
      amount: 7000,
      datetime: month.plus({ days: 10 }).toISODate(),
      id: `${month.toUnixInteger()}-Bell`,
      merchant: 'Bell Mobility',
      name: 'Bell Mobility',
    }),
    getTransaction({
      accountId: 'account-1',
      amount: 5000,
      datetime: month.plus({ days: 20 }).toISODate(),
      id: `${month.toUnixInteger()}-Beanfield`,
      merchant: 'Beanfield Internet',
      name: 'Beanfield Internet',
    }),
    getTransaction({
      accountId: 'account-1',
      amount: 50000,
      datetime: month.plus({ days: 15 }).toISODate(),
      id: `${month.toUnixInteger()}-TD-TransferToSavings`,
      merchant: 'TD',
      name: 'Transfer to Savings',
    }),
    getTransaction({
      accountId: 'account-1',
      amount: creditCardTotal,
      datetime: month.plus({ days: 15 }).toISODate(),
      id: `${month.toUnixInteger()}-TD-CreditCardPayment`,
      merchant: 'TD',
      name: 'Credit Card Payment',
    }),
  ];
}

function generateRandomizedTransaction({
  maxAmount = 100000,
  merchant,
  minAmount = 50000,
  month,
  index = 1,
}: {
  maxAmount?: number;
  merchant: string;
  minAmount?: number;
  month: DateTime;
  index?: number;
}): CoreTransaction {
  const monthSeed = month.toUnixInteger();
  const merchantSeed = toNumber(merchant);
  const randomSeed = monthSeed * merchantSeed * index;
  const amount = (randomSeed % (maxAmount - minAmount)) + minAmount;
  const daysInMonth = month.endOf('month').day;
  const day = (randomSeed % daysInMonth) + 1;
  return getTransaction({
    amount,
    datetime: month.set({ day }).toISODate(),
    id: randomSeed.toString(),
    merchant,
    name: merchant,
  });
}

function toNumber(input: string): number {
  const encodedInput = new TextEncoder().encode(input);
  const sum = encodedInput.reduce((result, item) => result + item, 0);
  return sum;
}

function getTransaction({
  accountId = 'account-1',
  amount = 10000,
  datetime = '2020-01-01',
  id = getUuid(),
  merchant = 'test merchant',
  name = 'Test transaction',
}: {
  accountId?: string;
  amount?: number;
  datetime?: string;
  id?: string;
  merchant?: string;
  name?: string;
} = {}): CoreTransaction {
  return {
    accountId,
    amount,
    datetime,
    id,
    merchant,
    name,
  };
}

export default generateTransactions;
