import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import styled from 'styled-components';

import Header from './container/Header';
import Menubar from './container/Menubar';
import Main from './page/Main';
import Table from '@page/Table';
import OverLay from '@components/OverLay';

const Wrapper = styled.div`
  width: 100%;
`;

const App = (): ReactElement => {
  return (
    <Provider>
      <BrowserRouter>
        <OverLay />
        <Menubar />
        <Wrapper>
          <Header />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/table" element={<Table />}></Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
