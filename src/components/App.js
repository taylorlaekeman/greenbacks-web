import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import Login from 'components/Login';
import Register from 'components/Register';
import Global from 'styles/Global';
import theme from 'styles/theme';

const Wrapper = styled.article`
  box-sizing: border-box;
  height: 100vh;
  padding: 30px 60px;
  width: 100vw;
`;

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
  color: ${(props) => props.theme.colours.text.title};
  margin: 0;
  margin-bottom: 2vh;
`;

const Subtitle = styled.p`
  font-weight: 200;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colours.text.normal};
  margin: 0;
  margin-bottom: 20vh;
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <Global />
    <Wrapper>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route>
            <Content>
              <Title>Greenbacks</Title>
              <Subtitle>Construction will begin soon</Subtitle>
            </Content>
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  </ThemeProvider>
);

export default App;
