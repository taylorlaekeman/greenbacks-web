import styled from 'styled-components';

const addProps = () => ({ type: 'submit' });

const Submit = styled.input.attrs(addProps)`
  text-align: left;
  background-color: ${(props) => props.theme.colours.background.button.primary};
  border: none;
  border-radius: 0;
  color: ${(props) => props.theme.colours.text.button.primary};
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  padding: 12px;
  -webkit-appearance: none;
`;

export default Submit;
