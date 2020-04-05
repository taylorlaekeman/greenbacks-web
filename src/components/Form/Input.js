import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const hasVisibleError = ({ isErrorVisible, isValid }) =>
  isErrorVisible && !isValid;

const Label = styled.label`
  color: ${(props) =>
    hasVisibleError(props)
      ? props.theme.colours.text.error
      : props.theme.colours.text.label};
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 2px;
  text-transform: capitalize;
`;

const Input = styled.input`
  border: solid
    ${(props) =>
      hasVisibleError(props)
        ? props.theme.colours.border.error
        : props.theme.colours.border.normal}
    1px;
  border-radius: 2px;
  box-sizing: border-box;
  color: ${(props) =>
    hasVisibleError(props)
      ? props.theme.colours.text.error
      : props.theme.colours.text.normal};
  font-size: 0.75rem;
  margin-bottom: ${(props) => (hasVisibleError(props) ? '4px' : '18px')};
  outline: none;
  padding: 12px 15px;
  width: 100%;
  -webkit-appearance: none;

  &::placeholder {
    color: ${(props) =>
      hasVisibleError(props)
        ? props.theme.colours.text.error
        : props.theme.colours.text.placeholder};
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
  isErrorVisible,
  isValid,
  name,
  onBlur,
  onChange,
  placeholder,
  type,
  value,
}) => (
  <>
    <Label htmlFor={name} isErrorVisible={isErrorVisible} isValid={isValid}>
      {name}
    </Label>
    <Input
      id={name}
      isErrorVisible={isErrorVisible}
      isValid={isValid}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
    {hasVisibleError({ isErrorVisible, isValid }) && (
      <Error htmlFor={name}>{error}</Error>
    )}
  </>
);

InputComponent.propTypes = {
  error: PropTypes.string,
  isErrorVisible: PropTypes.bool,
  isValid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputComponent.defaultProps = {
  error: '',
  isErrorVisible: false,
  isValid: true,
  onBlur: () => {},
  onChange: () => {},
  placeholder: '',
  type: 'text',
  value: '',
};

export default InputComponent;
