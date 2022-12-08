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

const RowWrapper = styled.div`
  position: relative;
  width: calc(100%);
  display: flex;
`;

const Wrapper = styled.div`
  position: relative;
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
`;

const App = (): ReactElement => {
  return (
    <Suspense fallback={<div>loading App</div>}>
      <BrowserRouter>
        <ToastContainer />
        <OverLay />
        <RowWrapper>
          <Menubar />
          <Wrapper>
            <Header />
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/todos" element={<Todos />}></Route>
              <Route path="/diagram" element={<DiagramPage />}></Route>
            </Routes>
          </Wrapper>
        </RowWrapper>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
