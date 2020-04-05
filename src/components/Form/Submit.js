import styled from 'styled-components';

const addProps = () => ({ type: 'submit' });

const Submit = styled.input.attrs(addProps)`
  text-align: left;
  background-color: ${(props) => props.theme.colours.background.button.primary};
  border: none;
  border-radius: 2px;
  color: ${(props) => props.theme.colours.text.button.primary};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 12px 15px;
  width: 100%;
  -webkit-appearance: none;
`;

export default Submit;
