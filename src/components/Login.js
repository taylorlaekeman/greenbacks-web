import React from 'react';
import styled from 'styled-components';

import Form from 'components/Form';
import Input from 'components/Form/Input';
import Link from 'components/Link';
import Submit from 'components/Form/Submit';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Header = styled.header`
  border-bottom: solid ${(props) => props.theme.colours.border.divider} 1px;
`;

const Underlined = styled.span`
  text-decoration: underline;
`;

const Login = () => (
  <Container>
    <Header>
      <Title>Greenbacks</Title>
      <Subtitle>Understand your spending</Subtitle>
    </Header>
    <main>
      <Form>
        <Input
          name="email"
          placeholder="Please enter your email"
          type="email"
        />
        <Input name="password" type="password" />
        <Submit value="Log in" />
      </Form>
      <Link to="/register">
        {"Don't have an account? "}
        <Underlined>Sign up</Underlined>
      </Link>
    </main>
  </Container>
);

export default Login;
