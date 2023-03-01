import React, { FC } from 'react';

import ArticleContainer from 'components/ArticleContainer';
import TotalsByMonth from 'components/TotalsByMonth';

const Overview: FC = () => (
  <ArticleContainer id="overview" title="Overview">
    <TotalsByMonth />
  </ArticleContainer>
);

export default Overview;
