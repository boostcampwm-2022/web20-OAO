import { useAtom, useSetAtom } from 'jotai';
import styled from 'styled-components';
import { ReactElement, Suspense, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getActiveTodoAtom, isFinishedAtom, modalTypeAtom, isMainPageAtom } from '@util/GlobalState';
import { TABLE_MODALS } from '@util/Constants';

import 'react-toastify/dist/ReactToastify.css';

import TodoTimeInteraction from '@container/main/TodoTimeInteraction';
import TodoStatus from '@container/main/TodoStatus';
import TodoTitle from '@container/main/TodoTitle';
import TodoContents from '@container/main/TodoContents';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const { none } = TABLE_MODALS;

const Main = (): ReactElement => {
  const [isFinished] = useAtom(isFinishedAtom);
  const [activeTodoAtom] = useAtom(getActiveTodoAtom); // -> aync로 activeTodo()
  const [modalType, setModalType] = useAtom(modalTypeAtom);
  const setMainPage = useSetAtom(isMainPageAtom);

  useEffect(() => {
    if (modalType !== none) {
      setModalType(none);
    }
    setMainPage();
  }, []);

  useEffect(() => {
    if (isFinished) {
      toast('오늘 주어진 일을 끝낸 멋진 사람! 😎');
    }
  }, [isFinished]);

  return (
    <Suspense fallback={<div>loading</div>}>
      <Wrapper>
        {activeTodoAtom !== undefined ? (
          <>
            <TodoStatus />
            <TodoTitle />
            <TodoTimeInteraction />
            <TodoContents />
          </>
        ) : (
          <div>Todo가 없습니다.</div>
        )}
      </Wrapper>
    </Suspense>
  );
};

export default Main;
