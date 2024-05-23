import React from 'react';
import styled from 'styled-components';

import { Header } from 'components/Header';
import useLogout from 'hooks/useLogout';

export function Page({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  const { logout } = useLogout();
  return (
    <PageWrapper>
      <Header onLogout={logout} />
      <PageBody>{children}</PageBody>
    </PageWrapper>
  );
}

export const PageWrapper = styled.main<{ isVerticallyCentered?: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  ${({ isVerticallyCentered = false }) =>
    isVerticallyCentered && 'justify-content: center;'}
  width: 100vw;
`;

export const PageBody = styled.article`
  max-width: 832px;
  overflow: scroll;
  padding: 16px;
  width: 100%;
`;
