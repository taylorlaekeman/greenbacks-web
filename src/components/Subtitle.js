import styled from 'styled-components';

const Subtitle = styled.p`
  color: ${(props) => props.theme.colours.text.subtitle};
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  text-transform: uppercase;
  padding: 24px 0;
`;

export default Subtitle;
