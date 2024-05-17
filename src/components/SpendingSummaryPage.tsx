import React from 'react';
import styled from 'styled-components';

import { CategoryAverageSummaryContainer } from 'components/CategoryAverageSummary';
import { SpendingSummaryListPage } from 'components/SpendingSummaryListPage';

export function SpendingSummary(): React.ReactElement {
  return (
    <Wrapper>
      <CategoryAverageSummaryContainer />
      <SpendingSummaryListPage />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 616px) {
    flex-direction: row;
  }
`;
