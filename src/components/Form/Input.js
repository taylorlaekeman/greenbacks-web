import styled from 'styled-components';

const Input = styled.input`
  border: solid ${(props) => props.theme.colours.border.normal} 1px;
  border-radius: 0;
  color: ${(props) => props.theme.colours.text.normal};
  font-family: 'Inter', sans-serif;
  margin-bottom: 36px;
  outline: none;
  padding: 12px;
  -webkit-appearance: none;
`;

export default Input;
