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
        <Link href="/spending">
          <Text>Spending</Text>
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
  background-color: palegreen;
  display: flex;
  justify-content: center;
  padding: 16px;
  width: 100%;

  @media (min-width: 632px) {
    padding: 16px 0;
  }
`;

const Nav = styled.nav`
  align-items: baseline;
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: max-content max-content max-content;
  grid-template-areas:
    'header header header'
    '. . .';
  max-width: 600px;
  width: 100%;

  @media (min-width: 600px) {
    grid-template-areas: 'header . . .';
    grid-template-columns: 1fr max-content max-content max-content;
  }

  & a#greenbacks {
    grid-area: header;
  }
`;
