import React, { FC } from 'react';

import Transaction from 'components/Transaction';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import TransactionType from 'types/transaction';
import groupTransactions, {
  GroupBy,
  SortGroupsBy,
} from 'utils/groupTransactions';
import styled from 'utils/styled';

const Transactions: FC<{
  groupBy?: GroupBy;
  sortGroupsBy?: SortGroupsBy;
  transactions: TransactionType[];
}> = ({
  groupBy = GroupBy.Date,
  sortGroupsBy = SortGroupsBy.Key,
  transactions,
}) => {
  const { format } = useCurrencyFormatter();
  const groupedTransactions = groupTransactions({
    groupBy,
    sortGroupsBy,
    transactions,
  });
  return (
    <>
      {groupedTransactions?.map((group) => (
        <>
          <GroupHeadings>
            <h4>{group.key}</h4>
            <p>{format(group.total)}</p>
          </GroupHeadings>
          <List>
            {group.transactions.map((transaction) => (
              <Item key={transaction.id}>
                <Transaction
                  isDateVisible
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

const GroupHeadings = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  margin-top: 48px;

  h4 {
    margin: 0;
  }

  p {
    margin: 0;
  }
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
