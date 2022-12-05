import { useAtom } from 'jotai';
import styled from 'styled-components';
import React, { ReactElement, useEffect, Suspense } from 'react';
import { toast } from 'react-toastify';

import { activeTodo, isFinishedAtom, modalTypeAtom } from '@util/GlobalState';
import { TABLE_MODALS } from '@util/Constants';

import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const TodoTimeInteraction = React.lazy(async () => await import('@container/main/TodoTimeInteraction'));
const TodoStatus = React.lazy(async () => await import('@container/main/TodoStatus'));
const TodoTitle = React.lazy(async () => await import('@container/main/TodoTitle'));
const TodoContents = React.lazy(async () => await import('@container/main/TodoContents'));

const { none } = TABLE_MODALS;

const Main = (): ReactElement => {
  const [isFinished] = useAtom(isFinishedAtom);
  const [activeTodoAtom] = useAtom(activeTodo);
  const [modalType, setModalType] = useAtom(modalTypeAtom);

  useEffect(() => {
    if (modalType !== none) {
      setModalType(none);
    }
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
