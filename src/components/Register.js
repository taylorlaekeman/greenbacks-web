import React from 'react';
import styled from 'styled-components';

import Input from 'components/Form/Input';
import Label from 'components/Form/Label';
import Submit from 'components/Form/Submit';
import UnstyledLink from 'components/Link';

const Title = styled.h2`
  color: ${(props) => props.theme.colours.text.title};
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  margin: 0;
  padding: 32px 0;
`;

const Main = styled.main`
  display: grid;
`;

const Form = styled.form`
  display: grid;
`;

const Link = styled(UnstyledLink)`
  font-size: 0.8rem;
  margin-top: 16px;
  padding: 6px 13px;
`;

const Register = () => (
  <article>
    <header>
      <Title>Sign up</Title>
    </header>
    <Main>
      <Form>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
        <Submit value="Sign up" />
      </Form>
      <Link to="/login">Login</Link>
    </Main>
  </article>
);

export default Register;
