import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import Transactions from 'components/Transactions';
import useAveragingPeriod from 'hooks/useAveragingPeriod';
import useUntaggedTransactions from 'hooks/useUntaggedTransactions';

const UntaggedTransactions: FC = () => {
  const { endIso: endDate, startIso: startDate } = useAveragingPeriod();
  const {
    earning: credits,
    isLoading,
    spending: debits,
  } = useUntaggedTransactions({
    endDate,
    startDate,
  });

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      {credits && (
        <SectionContainer
          id="untagged-credits"
          isCollapsible
          title={`Untagged Credits (${credits?.length})`}
        >
          <Transactions transactions={credits || []} />
        </SectionContainer>
      )}
      {debits && (
        <SectionContainer
          id="untagged-debits"
          isCollapsible
          title={`Untagged Debits (${debits?.length})`}
        >
          <Transactions transactions={debits || []} />
        </SectionContainer>
      )}
    </>
  );
};

export default UntaggedTransactions;
