import React, { useState } from 'react';

import { SpendingSummaryList } from 'components/SpendingSummaryList';
import useNow from 'hooks/useNow';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';

export function SpendingSummaryListPage(): React.ReactElement {
  const { now } = useNow();
  const { spending } = useTransactionsByCategory({
    endDate: now.endOf('month').toISODate(),
    startDate: now.startOf('month').toISODate(),
  });
  const [expandedTag, setExpandedTag] = useState<string | undefined>(undefined);
  return (
    <SpendingSummaryList
      expandedTag={expandedTag}
      isCurrentMonth
      onSelectTag={(tag) => setExpandedTag(tag)}
      transactions={spending}
    />
  );
}
