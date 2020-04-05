import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  color: ${(props) =>
    props.isValid
      ? props.theme.colours.text.label
      : props.theme.colours.text.error};
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 2px;
  text-transform: capitalize;
`;

const Input = styled.input`
  border: solid
    ${(props) =>
      props.isValid
        ? props.theme.colours.border.normal
        : props.theme.colours.border.error}
    1px;
  border-radius: 2px;
  box-sizing: border-box;
  color: ${(props) =>
    props.isValid
      ? props.theme.colours.text.normal
      : props.theme.colours.text.error};
  font-size: 0.75rem;
  margin-bottom: ${(props) => (props.isValid ? '18px' : '4px')};
  outline: none;
  padding: 12px 15px;
  width: 100%;
  -webkit-appearance: none;

  &::placeholder {
    color: ${(props) =>
      props.isValid
        ? props.theme.colours.text.placeholder
        : props.theme.colours.text.error};
    opacity: 100;
  }
`;

const Error = styled.label`
  color: ${(props) => props.theme.colours.text.error};
  display: block;
  font-size: 0.5rem;
  letter-spacing: 1px;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

const InputComponent = ({
  error,
  isValid,
  name,
  onChange,
  placeholder,
  type,
  value,
}) => (
  <>
    <Label htmlFor={name} isValid={isValid}>
      {name}
    </Label>
    <Input
      id={name}
      isValid={isValid}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
    {!isValid && <Error htmlFor={name}>{error}</Error>}
  </>
);

InputComponent.propTypes = {
  error: PropTypes.string,
  isValid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputComponent.defaultProps = {
  error: '',
  isValid: true,
  onChange: () => {},
  placeholder: '',
  type: 'text',
  value: '',
};

export default InputComponent;
