import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import { JustifiedRow } from 'components/JustifiedRow';

const meta: Meta<typeof JustifiedRow> = {
  args: {},
  component: JustifiedRow,
  parameters: {
    layout: 'centered',
  },
  title: 'Atoms/JustifiedRow',
};

type Story = StoryObj<typeof JustifiedRow>;

export const TwoItems: Story = {
  render: () => (
    <Wrapper>
      <JustifiedRow>
        <p>first</p>
        <p>second</p>
      </JustifiedRow>
    </Wrapper>
  ),
};

export const ThreeItems: Story = {
  render: () => (
    <Wrapper>
      <JustifiedRow>
        <p>first</p>
        <p>second</p>
        <p>third</p>
      </JustifiedRow>
    </Wrapper>
  ),
};

const Wrapper = styled.div`
  border: solid lightgrey 1px;
  border-radius: 4px;
  padding: 0 16px;
  width: 300px;
`;

export default meta;
