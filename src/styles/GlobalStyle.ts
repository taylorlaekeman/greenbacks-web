import { createGlobalStyle } from 'utils/styled';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Lora', serif;
  }

  body {
    margin: 0;
  }
`;

export default GlobalStyle;
