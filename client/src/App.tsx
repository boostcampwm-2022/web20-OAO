import { ReactElement, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import Header from './container/Header';
import Menubar from './container/Menubar';

import Todos from '@page/Todos';
// import Main from './page/Main';
import OverLay from '@components/OverLay';
import { Provider } from 'jotai';

const Wrapper = styled.div`
  width: 100%;
`;

const Main = lazy(async () => await import('@page/Main'));

const App = (): ReactElement => {
  return (
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
  );
};

export default App;
