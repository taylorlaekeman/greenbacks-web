import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    background-color: ${props => props.theme.colours.background.overflow};
  }

  body {
    margin: 0;
    background-color: ${props => props.theme.colours.background.page};
  }
`;
