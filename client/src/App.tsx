import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import Header from './container/Header';
import Menubar from './container/Menubar';

import Todos from '@page/Todos';
import Main from './page/Main';
import OverLay from '@components/OverLay';

const Wrapper = styled.div`
  width: 100%;
`;

const App = (): ReactElement => {
  return (
    <Provider>
      <BrowserRouter>
        <ToastContainer />
        <OverLay />
        <Menubar />
        <Wrapper>
          <Header />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/todos" element={<Todos />}></Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
