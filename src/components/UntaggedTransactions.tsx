import React, { FC } from 'react';

import SectionContainer from 'components/SectionContainer';
import Transactions from 'components/Transactions';
import usePreviousSixMonths from 'hooks/usePreviousSixMonths';
import useUntaggedTransactions from 'hooks/useUntaggedTransactions';

const UntaggedTransactions: FC = () => {
  const { endIso: endDate, startIso: startDate } = usePreviousSixMonths();
  const { isLoading, spending } = useUntaggedTransactions({
    endDate,
    startDate,
  });

  if (isLoading || !spending) return null;

  return (
    <SectionContainer id="untagged-spending" title="Untagged Spending">
      <Transactions transactions={spending} />
    </SectionContainer>
  );
};

export default UntaggedTransactions;
