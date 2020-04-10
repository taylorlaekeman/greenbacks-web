import styled from 'styled-components';

const Title = styled.h1`
  color: ${(props) => props.theme.colours.text.title};
  font-family: 'Playfair Display', serif;
  font-size: 2.9rem;
  font-weight: 700;
  margin: 0;
`;

export default Title;
