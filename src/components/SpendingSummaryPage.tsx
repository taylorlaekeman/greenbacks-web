import React from 'react';
import styled from 'styled-components';

import { AverageAmountSummaryContainer } from 'components/AverageAmountSummary';
import { CumulativeAmountSummaryContainer } from 'components/CumulativeAmountSummary';

export function SpendingSummary(): React.ReactElement {
  return (
    <Wrapper>
      <AverageAmountSummaryContainer />
      <CumulativeAmountSummaryContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;

  @media (min-width: 632px) {
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 832px) {
    width: 800px;
  }
`;
