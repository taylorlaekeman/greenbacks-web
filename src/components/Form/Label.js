import styled from 'styled-components';

const Label = styled.label`
  color: ${(props) => props.theme.colours.text.label};
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  margin-bottom: 2px;
`;

export default Label;
