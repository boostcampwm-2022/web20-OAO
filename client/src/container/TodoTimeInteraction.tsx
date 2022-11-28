import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import styled from 'styled-components';
import PostponeBox from '../components/PostponeBox';

import TodoInteractionButton from '../components/TodoInteractionButton';
import TodoTimeText from '../components/TodoTimeText';

import { Todo } from '../core/todo/index';
import { postponeClicked } from '../util/GlobalState';

const Wrapper = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TodoTimeInteraction = ({ activeTodo }: { activeTodo: Todo }): ReactElement => {
  const [isPostpone] = useAtom(postponeClicked);

  return (
    <>
      <Wrapper>
        <TodoInteractionButton />
        <TodoTimeText until={activeTodo.until} />
        {isPostpone && <PostponeBox />}
      </Wrapper>
    </>
  );
};

export default TodoTimeInteraction;
