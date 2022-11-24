import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body{
    height: 100%;
    margin: 0;
    font-family: 'Nanum Myeongjo','Noto Sans KR','Roboto', sans-serif;
  }
  #root {
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
  button {background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible;
  }
`;

export default GlobalStyle;
