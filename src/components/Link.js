import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(UnstyledLink)`
  color: ${(props) => props.theme.colours.text.understated};
  display: inline-block;
  font-size: 0.8rem;
  margin-top: 15px;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

export default Link;
