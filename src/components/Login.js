import React, { useState } from 'react';
import styled from 'styled-components';

import Form from 'components/Form';
import Input from 'components/Form/Input';
import Link from 'components/Link';
import Submit from 'components/Form/Submit';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';
import { isValidEmail } from 'utils/isValid';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Header>
        <Title>Greenbacks</Title>
        <Subtitle>Understand your spending</Subtitle>
      </Header>
      <main>
        <Form>
          <Input
            error={!email ? 'This field is required' : 'Must be a valid email'}
            isValid={email && isValidEmail(email)}
            name="email"
            onChange={setEmail}
            placeholder="Please enter your email"
            type="email"
            value={email}
          />
          <Input
            error="This field is required"
            isValid={!!password}
            name="password"
            onChange={setPassword}
            type="password"
            value={password}
          />
          <Submit value="Log in" />
        </Form>
        <Link to="/register">
          {"Don't have an account? "}
          <Underlined>Sign up</Underlined>
        </Link>
      </main>
    </Container>
  );
};

export default Login;
