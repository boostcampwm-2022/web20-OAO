import { ReactElement, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import Header from '@container/Header';
import Menubar from '@container/Menubar';

import Main from '@page/Main';
import Todos from '@page/Todos';
import DiagramPage from '@page/DiagramPage';
import OverLay from '@components/OverLay';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const App = (): ReactElement => {
  return (
    <Suspense fallback={<div>loading App</div>}>
      <BrowserRouter>
        <ToastContainer />
        <OverLay />
        <Menubar />
        <Wrapper>
          <Header />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/todos" element={<Todos />}></Route>
            <Route path="/diagram" element={<DiagramPage />}></Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
