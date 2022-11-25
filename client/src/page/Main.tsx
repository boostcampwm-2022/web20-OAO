import { useAtom } from 'jotai';
import styled from 'styled-components';
import TodoStatus from '../container/TodoStatus';
import { mockTodosData } from '../util/GlobalState';
import { ReactElement } from 'react';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = (): ReactElement => {
  const [todosArray] = useAtom(mockTodosData);

  return (
    <Wrapper>
      <TodoStatus activeTodo={todosArray[0]} />
    </Wrapper>
  );
};

export default Main;
