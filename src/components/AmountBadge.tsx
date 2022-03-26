import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import styled from 'utils/styled';

const AmountBadge: FC<Props> = ({ amount, isLoading = false, label, name }) => {
  const { format } = useCurrencyFormatter();

  if (isLoading) return <LoadingIndicator name={name} />;

  return (
    <Wrapper>
      <Amount data-testid={name}>{format({ value: amount })}</Amount>
      <Label data-testid={`${name}-label`}>{label}</Label>
    </Wrapper>
  );
};

interface Props {
  amount: number;
  isLoading?: boolean;
  label: string;
  name?: string;
}

const Wrapper = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 100px;
`;

const Amount = styled.p`
  font-size: 4rem;
  margin: 0;
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;

export default AmountBadge;
