import React, { FC } from 'react';
import styled from 'utils/styled';

import Transaction from 'components/Transaction';
import TransactionType from 'types/transaction';

const Transactions: FC<{ transactions: TransactionType[] }> = ({
  transactions,
}) => {
  const transactionsByDate = getTransactionsByDate(transactions);
  return (
    <>
      {Object.entries(transactionsByDate).map(([date, dateTransactions]) => (
        <>
          <Date>{date}</Date>
          <List>
            {dateTransactions.map((transaction) => (
              <Item key={transaction.id}>
                <Transaction
                  isDateVisible={false}
                  isFilteringEnabled
                  transaction={transaction}
                />
              </Item>
            ))}
          </List>
        </>
      ))}
    </>
  );
};

function getTransactionsByDate(
  transactions: TransactionType[]
): Record<string, TransactionType[]> {
  return transactions.reduce(
    (
      transactionsByDate: Record<string, TransactionType[]>,
      transaction: TransactionType
    ) => {
      const dateTransactions = transactionsByDate[transaction.datetime] || [];
      return {
        ...transactionsByDate,
        [transaction.datetime]: [...dateTransactions, transaction],
      };
    },
    {}
  );
}

const Date = styled.p`
  margin-bottom: 8px;
  margin-top: 24px;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  li:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  li:last-child {
    border-bottom: solid black 1px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const Item = styled.li`
  border: solid black 1px;
  border-bottom: none;
  padding: 8px;
`;

export default Transactions;
