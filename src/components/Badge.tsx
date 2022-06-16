import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import styled from 'utils/styled';

const Badge: FC<Props> = ({ children, isLoading = false, label, name }) => {
  if (isLoading) return <LoadingIndicator name={name} />;

  return (
    <Wrapper>
      <Text data-testid={name}>{children}</Text>
      {label && <Label data-testid={`${name}-label`}>{label}</Label>}
    </Wrapper>
  );
};

export interface Props {
  isLoading?: boolean;
  label?: string;
  name?: string;
}

const Wrapper = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 100px;
`;

const Text = styled.p`
  font-size: 4rem;
  margin: 0;
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;

export default Badge;
