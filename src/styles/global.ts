import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  min-width: 100%;
  min-height: 100%;
  margin: 0;
  font-family: "Roboto Condensed", sans-serif;
  background-color: #f0f0f0;

  #root {
    min-width: 100%;
    min-height: 100%;
  }
}
`;

export default GlobalStyle;
