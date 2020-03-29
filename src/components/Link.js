import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(UnstyledLink)`
  color: ${(props) => props.theme.colours.text.normal};
  font-family: 'Inter', sans-serif;
`;

export default Link;
