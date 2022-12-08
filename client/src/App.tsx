import { ReactElement, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { useAtomValue } from 'jotai';

import Header from '@container/Header';
import Menubar from '@container/Menubar';

import Main from '@page/Main';
import Todos from '@page/Todos';
import DiagramPage from '@page/DiagramPage';
import OverLay from '@components/OverLay';
import TodoController from '@container/TodoController';

import { TutorialImage } from '@components/tutorial/TutorialImage';
import { isTutorialAtom } from '@util/GlobalState';

const RowWrapper = styled.div`
  position: relative;
  width: calc(100%);
  display: flex;
`;

const Wrapper = styled.div`
  position: relative;
  width: calc(100% - 64px);
  display: flex;
  flex-direction: column;
`;

const TutorialRadialOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;

  background: linear-gradient(180deg, rgba(217, 217, 217, 0) 73.51%, #93c692 127.82%);

  pointer-events: none;

  p {
    position: absolute;
    left: 10vh;
    bottom: 2vh;
    font-size: 24px;
    opacity: 0.7;
  }
`;

const App = (): ReactElement => {
  const isTutorial = useAtomValue(isTutorialAtom);
  const [isOver, setIsOver] = useState(false);
  const isShow = isTutorial && !isOver;

  useEffect(() => {
    if (!isTutorial) {
      setIsOver(false);
    }
  });

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
              <Route path="/tutorials" element={<Main />}></Route>
              <Route path="/tutorials/todos" element={<Todos />}></Route>
              <Route path="/tutorials/diagram" element={<DiagramPage />}></Route>
            </Routes>
          </Wrapper>
          <TodoController />
          {isShow && <TutorialImage isTutorial={isTutorial} setIsOver={setIsOver} />}
          {isTutorial && (
            <TutorialRadialOverlay>
              <span>
                <p>튜토리얼 중입니다...</p>
              </span>
            </TutorialRadialOverlay>
          )}
        </RowWrapper>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
