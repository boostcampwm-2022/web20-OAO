import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import styled from 'styled-components';

import Header from './container/Header';
import Menubar from './container/Menubar';

const Wrapper = styled.div`
  width: 100%;
`;

const App = (): ReactElement => {
  return (
    <Provider>
      <BrowserRouter>
        <Menubar />
        <Wrapper>
          <Header />
          <Routes>
            <Route path="/" element={<div>main</div>}></Route>
            <Route path="/table" element={<div>table</div>}></Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
