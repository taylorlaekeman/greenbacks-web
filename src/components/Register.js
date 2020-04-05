import React, { useState } from 'react';
import styled from 'styled-components';

import Form from 'components/Form';
import Input from 'components/Form/Input';
import Link from 'components/Link';
import Submit from 'components/Form/Submit';
import Title from 'components/Title';
import { isValidEmail } from 'utils/isValid';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Underlined = styled.span`
  text-decoration: underline;
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailErrorVisible, setIsEmailErrorVisible] = useState(false);
  const [isPasswordErrorVisible, setIsPasswordErrorVisible] = useState(false);
  const [
    isConfirmPasswordErrorVisible,
    setIsConfirmPasswordErrorVisible,
  ] = useState(false);

  return (
    <Container>
      <header>
        <Title>Welcome to Greenbacks</Title>
      </header>
      <main>
        <Form
          onSubmit={() => {
            setIsEmailErrorVisible(true);
            setIsPasswordErrorVisible(true);
            setIsConfirmPasswordErrorVisible(true);
          }}
        >
          <Input
            error={!email ? 'This field is required' : 'Must be a valid email'}
            isErrorVisible={isEmailErrorVisible}
            isValid={!!email && isValidEmail(email)}
            name="email"
            onBlur={() => setIsEmailErrorVisible(true)}
            onChange={setEmail}
            placeholder="Please enter your email"
            type="email"
            value={email}
          />
          <Input
            error="This field is required"
            isErrorVisible={isPasswordErrorVisible}
            isValid={!!password}
            name="password"
            onBlur={() => setIsPasswordErrorVisible(true)}
            onChange={setPassword}
            type="password"
            value={password}
          />
          <Input
            error={
              confirmPassword ? 'Must match password' : 'This field is required'
            }
            isErrorVisible={isConfirmPasswordErrorVisible}
            isValid={!!confirmPassword && password === confirmPassword}
            name="confirm password"
            onBlur={() => setIsConfirmPasswordErrorVisible(true)}
            onChange={setConfirmPassword}
            type="password"
            value={confirmPassword}
          />
          <Submit value="Sign up" />
        </Form>
        <Link to="/login">
          {'Already have an account? '}
          <Underlined>Log in</Underlined>
        </Link>
      </main>
    </Container>
  );
};

export default Register;
