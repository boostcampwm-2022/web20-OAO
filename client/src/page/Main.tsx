import styled from 'styled-components';
import { ReactElement } from 'react';

import TodoTitle from '@container/TodoTitle';
import TodoStatus from '@container/TodoStatus';
import TodoTimeInteraction from '@container/TodoTimeInteraction';
import TodoContents from '@container/TodoContents';
import useTodoList from '../hooks/useTodoList';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Main = (): ReactElement => {
  const [, activeTodo] = useTodoList();
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
    </Wrapper>
  );
};

export default Main;
