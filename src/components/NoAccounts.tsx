import React, { useContext } from 'react';
import styled from 'styled-components';

import { Button, ButtonStyle } from 'components/Button';
import Link from 'components/Link';
import { PageContainer } from 'components/Page';
import { Text } from 'components/Text';
import { UserSettingsContext } from 'context/UserSettings';
import noop from 'utils/noop';

export function NoAccounts({
  onEnableDemoMode = noop,
}: {
  onEnableDemoMode?: () => void;
}): React.ReactElement {
  return (
    <PageContainer>
      <Wrapper>
        <Text>You have not yet connected any accounts to Greenbacks</Text>
        <Text>
          Please <Link href="/accounts">connect an account</Link> or{' '}
          <Button onClick={onEnableDemoMode} style={ButtonStyle.Text}>
            enable demo mode
          </Button>
          .
        </Text>
      </Wrapper>
    </PageContainer>
  );
}

const Wrapper = styled.div`
  p:first-child {
    margin-bottom: 32px;
  }
`;

export function NoAccountsContainer(): React.ReactElement {
  const { onChangeTestDataUsage } = useContext(UserSettingsContext);
  return <NoAccounts onEnableDemoMode={() => onChangeTestDataUsage(true)} />;
}
