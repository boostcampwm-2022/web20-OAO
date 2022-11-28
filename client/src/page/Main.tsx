import { useAtom } from 'jotai';
import styled from 'styled-components';
import { activeTodoAtom } from '@util/GlobalState';
import { ReactElement, Suspense } from 'react';

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

const ComponentUsingAsyncAtoms = (): ReactElement => {
  const [activeTodo] = useAtom(activeTodoAtom);
  return (
    <>
      <TodoStatus activeTodo={activeTodo} />
      <TodoTitle activeTodo={activeTodo} />
      <TodoTimeInteraction activeTodo={activeTodo} />
      <TodoContents activeTodo={activeTodo} />
    </>
  );
};

const Main = (): ReactElement => {
  return (
    <Wrapper>
      <Suspense fallback={<div>waiting....</div>}>
        <ComponentUsingAsyncAtoms />
      </Suspense>
    </Wrapper>
  );
};

export default Main;
