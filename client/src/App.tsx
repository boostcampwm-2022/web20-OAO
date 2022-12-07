import { ReactElement, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { useAtom } from 'jotai';

import Header from '@container/Header';
import Menubar from '@container/Menubar';

import Todos from '@page/Todos';
import OverLay from '@components/OverLay';
import { isTutorialAtom } from '@util/GlobalState';

const Wrapper = styled.div`
  width: 100%;
`;

const Main = lazy(async () => await import('@page/Main'));

const App = (): ReactElement => {
  const [isTutorial, ] = useAtom(isTutorialAtom);
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
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
