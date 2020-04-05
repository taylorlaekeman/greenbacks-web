import React from 'react';
import styled from 'styled-components';

import Input from 'components/Form/Input';
import Link from 'components/Link';
import Submit from 'components/Form/Submit';
import Title from 'components/Title';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Underlined = styled.span`
  text-decoration: underline;
`;

const Register = () => (
  <Container>
    <header>
      <Title>Welcome to Greenbacks</Title>
    </header>
    <main>
      <form>
        <Input
          name="email"
          type="email"
          placeholder="Please enter your email"
        />
        <Input name="password" type="password" />
        <Input name="confirm password" type="password" />
        <Submit value="Sign up" />
      </form>
      <Link to="/login">
        {'Already have an account? '}
        <Underlined>Log in</Underlined>
      </Link>
    </main>
  </Container>
);

export default Register;
