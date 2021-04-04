import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';

const LoadingIndicator: FunctionComponent = () => <Cog />;

const Cog = styled(UnstyledCog)`
  animation: spin 2s linear infinite;
  width: 20px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingIndicator;
