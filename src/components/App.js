import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Global from 'styles/Global';
import theme from 'styles/theme';

const Content = styled.article`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  font-size: 4rem;
  color: ${props => props.theme.colours.text.title};
  margin: 0;
  margin-bottom: 2vh;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: 1.2rem;
  color: ${props => props.theme.colours.text.normal};
  margin: 0;
  margin-bottom: 20vh;
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <Global />
    <Content>
      <Title>Greenbacks</Title>
      <Subtitle>Construction will begin soon</Subtitle>
    </Content>
  </ThemeProvider>
);

export default App;
