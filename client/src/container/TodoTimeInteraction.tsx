import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

import TodoInteractionButton from '../components/TodoInteractionButton';
import TodoTimeText from '../components/TodoTimeText';

import { Todo } from '../core/todo/index';

const Wrapper = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoTimeInteraction = ({ activeTodo }: { activeTodo: Todo }): ReactElement => {
  return (
    <Wrapper>
      <TodoInteractionButton />
      <TodoTimeText until={activeTodo.until} />
    </Wrapper>
  );
};

export default TodoTimeInteraction;
