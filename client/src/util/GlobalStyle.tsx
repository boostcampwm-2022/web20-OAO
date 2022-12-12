import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body{
    height: 100%;
    margin: 0;
    font-family: 'Nanum Myeongjo','Noto Sans KR','Roboto', sans-serif;
  }
  #root {
    position: relative;
    height: 100%;
    margin: 0;
  }
  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 14px;
  }
  p {
    font-size: 1rem;
  }
  button {
    background: inherit ;
    border:none;
    box-shadow:none;
    border-radius:0;
    padding:0;
    overflow:visible;
  }
  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
