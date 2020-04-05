import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  color: ${(props) => props.theme.colours.text.label};
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 2px;
  text-transform: capitalize;
`;

const Input = styled.input`
  border: solid ${(props) => props.theme.colours.border.normal} 1px;
  border-radius: 2px;
  box-sizing: border-box;
  color: ${(props) => props.theme.colours.text.normal};
  font-size: 0.75rem;
  margin-bottom: 15px;
  outline: none;
  padding: 12px 15px;
  width: 100%;
  -webkit-appearance: none;

  &::placeholder {
    color: ${(props) => props.theme.colours.text.placeholder};
    opacity: 100;
  }
`;

const InputComponent = ({ name, placeholder, type }) => (
  <>
    <Label htmlFor={name}>{name}</Label>
    <Input id={name} placeholder={placeholder} type={type} />
  </>
);

InputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

InputComponent.defaultProps = {
  placeholder: '',
  type: 'text',
};

export default InputComponent;
