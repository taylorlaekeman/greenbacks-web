import React, { FC } from 'react';
import styled from 'styled-components';

import { basicFontStyles } from 'components/Text';

const Label: FC<{ forId?: string }> = ({ children, forId }) => (
  <StyledLabel htmlFor={forId}>{children}</StyledLabel>
);

const StyledLabel = styled.label`
  ${basicFontStyles}
`;

export default Label;
