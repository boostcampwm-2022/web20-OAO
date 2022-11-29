import { useAtom } from 'jotai';
import styled from 'styled-components';
import { ReactElement, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import TodoTitle from '@container/TodoTitle';
import TodoStatus from '@container/TodoStatus';
import TodoTimeInteraction from '@container/TodoTimeInteraction';
import TodoContents from '@container/TodoContents';

import useTodoList from '../hooks/useTodoList';

import { isFinishedAtom } from '@util/GlobalState';

import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Main = (): ReactElement => {
  const [, activeTodo] = useTodoList();
  const [isFinished] = useAtom(isFinishedAtom);

  useEffect(() => {
    if (isFinished) {
      toast('오늘 주어진 일을 끝낸 멋진 사람! 😎');
    }
  }, [isFinished]);

  return (
    <Wrapper>
      {activeTodo.id !== undefined ? (
        <>
          <TodoStatus activeTodo={activeTodo} />
          <TodoTitle activeTodo={activeTodo} />
          <TodoTimeInteraction activeTodo={activeTodo} />
          <TodoContents activeTodo={activeTodo} />
        </>
      ) : (
        <div>Good Job bbb</div>
      )}
      <ToastContainer />
    </Wrapper>
  );
};

export default Main;
