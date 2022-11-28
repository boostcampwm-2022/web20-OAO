import { useAtom } from 'jotai';
import styled from 'styled-components';
import { mockTodosData } from '@util/GlobalState';
import { ReactElement } from 'react';

import TodoTitle from '@container/TodoTitle';
import TodoStatus from '@container/TodoStatus';
import TodoTimeInteraction from '@container/TodoTimeInteraction';
import TodoContents from '@container/TodoContents';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Main = (): ReactElement => {
  const [todosArray] = useAtom(mockTodosData);

  return (
    <Wrapper>
      <TodoStatus activeTodo={todosArray[0]} />
      <TodoTitle activeTodo={todosArray[0]} />
      <TodoTimeInteraction activeTodo={todosArray[0]} />
      <TodoContents activeTodo={todosArray[0]} />
    </Wrapper>
  );
};

export default Main;
