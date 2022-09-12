import React, { FC } from 'react';

import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useMonth from 'hooks/useMonth';
import useUntaggedTransactions from 'hooks/useUntaggedTransactions';

const UntaggedTransactions: FC = () => {
  const { endDate, startDate } = useMonth();
  const { isLoading, untaggedTransactions } = useUntaggedTransactions({
    endDate,
    startDate,
  });
  const { format } = useCurrencyFormatter();

  if (isLoading || !untaggedTransactions) return null;

  return (
    <SectionContainer id="untagged-transactions" title="Untagged Transactions">
      <ul>
        {untaggedTransactions.map(
          ({ amount, datetime, id, merchant, name }) => (
            <li key={id}>
              {format({ value: amount })}
              &mdash;
              {merchant}
              &nbsp;&#40;
              {name}
              &#41;&mdash;
              {datetime}
              &nbsp;
              {id}
            </li>
          )
        )}
      </ul>
    </SectionContainer>
  );
};

export default UntaggedTransactions;
