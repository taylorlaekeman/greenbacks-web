import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import { PageWrapper } from 'components/Page';
import { Size, Text } from 'components/Text';
import useLogin from 'hooks/useLogin';

export function Login(): React.ReactElement {
  const { login } = useLogin();
  return (
    <PageWrapper isVerticallyCentered>
      <Wrapper>
        <Text size={Size.Large}>Greenbacks</Text>
        <Text size={Size.Small}>Understand your finances</Text>
        <Button isFullWidth onClick={login}>
          Login
        </Button>
      </Wrapper>
    </PageWrapper>
  );
}

const Wrapper = styled.div`
  padding-bottom: 128px;

  & > p:nth-child(2) {
    margin-bottom: 128px;
    text-align: center;
  }
`;
