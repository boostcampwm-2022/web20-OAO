import { ReactElement, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import Header from '@container/Header';
import Menubar from '@container/Menubar';

import Todos from '@page/Todos';
import OverLay from '@components/OverLay';
import TodoController from '@container/TodoController';

const Wrapper = styled.div`
  width: 100%;
`;

const Main = lazy(async () => await import('@page/Main'));

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
          </Routes>
        </Wrapper>
        <TodoController />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
