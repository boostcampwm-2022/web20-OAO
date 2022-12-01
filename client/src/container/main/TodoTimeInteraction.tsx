import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import styled from 'styled-components';

import PostponeBox from '@components/main/PostponeBox';
import TodoInteractionButton from '@components/main/TodoInteractionButton';
import TodoTimeText from '@components/main/TodoTimeText';

import { PlainTodo } from '@todo/todo.type';

import { postponeClicked } from '@util/GlobalState';

const Wrapper = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

interface ComponentTodo {
  setPostpone: Function;
  postpone?: boolean;
  activeTodo: PlainTodo;
  postponeOptions: string[];
  elapsedTime: number;
  setElapsedTime: Function;
  setDone: Function;
  displayTime: string;
  handleOnToggle: Function;
  buttonConfig: any;
}

const TodoTimeInteraction = ({
  activeTodo,
  setDone,
  postponeOptions,
  setPostpone,
  displayTime,
  handleOnToggle,
  buttonConfig,
}: ComponentTodo): ReactElement => {
  const [isPostpone] = useAtom(postponeClicked);
  return (
    <Wrapper>
      <TodoInteractionButton
        buttonConfig={buttonConfig}
        handleOnToggle={handleOnToggle}
        activeTodo={activeTodo}
        setDone={setDone}
      />
      {activeTodo?.until !== undefined && (
        <TodoTimeText until={activeTodo.until.toString()} displayTime={displayTime} />
      )}
      {isPostpone && (
        <PostponeBox postponeOptions={postponeOptions} setPostpone={setPostpone} handleOnToggle={handleOnToggle} />
      )}
    </Wrapper>
  );
};

export default TodoTimeInteraction;
