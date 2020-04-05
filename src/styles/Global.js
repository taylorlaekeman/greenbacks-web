import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    font-family: 'Inter', sans-serif;
  }

  html {
    background-color: ${(props) => props.theme.colours.background.overflow};
  }

  body {
    margin: 0;
    background-color: ${(props) => props.theme.colours.background.page};
  }
`;
