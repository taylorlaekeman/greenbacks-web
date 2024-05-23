import React from 'react';
import styled from 'styled-components';

import { Button, ButtonStyle } from 'components/Button';
import { Link, LinkStyle } from 'components/Link';
import { Heirarchy, Size, Text } from 'components/Text';
import noop from 'utils/noop';

export function Header({
  onLogout = noop,
}: {
  onLogout?: () => void;
}): React.ReactElement {
  return (
    <Wrapper>
      <Nav>
        <Link href="/" id="greenbacks" style={LinkStyle.Unstyled}>
          <Text heirarchy={Heirarchy.H1} size={Size.Large}>
            Greenbacks
          </Text>
        </Link>
        <Link href="/widgets">
          <Text>Widgets</Text>
        </Link>
        <Link href="/accounts">
          <Text>Accounts</Text>
        </Link>
        <Button onClick={onLogout} style={ButtonStyle.Text}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  background-color: #d0f0c0;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Nav = styled.nav`
  align-items: center;
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: max-content max-content max-content;
  grid-template-areas:
    'header header header'
    '. . .';
  max-width: 832px;
  padding: 16px;
  width: 100%;

  @media (min-width: 470px) {
    grid-template-areas: 'header . . .';
    grid-template-columns: 1fr max-content max-content max-content;
  }

  & a#greenbacks {
    grid-area: header;
  }
`;
