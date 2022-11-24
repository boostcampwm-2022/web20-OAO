import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import App from './App';
import GlobalStyle from './util/GlobalStyle';

const Wrapper = styled.div`
  display: flex;
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>,
);
