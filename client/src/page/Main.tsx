import { useAtom } from 'jotai';
import styled from 'styled-components';
import { ReactElement, useEffect } from 'react';
import { toast } from 'react-toastify';

import TodoTitle from '@container/main/TodoTitle';
import TodoStatus from '@container/main/TodoStatus';
import TodoTimeInteraction from '@container/main/TodoTimeInteraction';
import TodoContents from '@container/main/TodoContents';

import useTodoList from '../hooks/useTodoList';

import { isFinishedAtom, modalTypeAtom } from '@util/GlobalState';
import { TABLE_MODALS } from '@util/Constants';

import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const { none } = TABLE_MODALS;

const Main = (): ReactElement => {
  const useTodoListHook = useTodoList();
  const [isFinished] = useAtom(isFinishedAtom);
  const [modalType, setModalType] = useAtom(modalTypeAtom);

  const { activeTodo } = useTodoListHook;

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
    <Wrapper>
      {activeTodo?.id !== undefined ? (
        <>
          <TodoStatus activeTodo={activeTodo} />
          <TodoTitle activeTodo={activeTodo} />
          <TodoTimeInteraction {...useTodoListHook} />
          <TodoContents activeTodo={activeTodo} />
        </>
      ) : (
        <div>Good Job bbb</div>
      )}
    </Wrapper>
  );
};

export default Main;
