import { useAtom } from 'jotai';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import PostponeBox from '@components/main/PostponeBox';
import TodoInteractionButton from '@components/main/TodoInteractionButton';
import TodoTimeText from '@components/main/TodoTimeText';

import { PlainTodo } from '@todo/todo.type';

import { postponeClicked, isOnProgress } from '@util/GlobalState';

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
  beforeMovePage: Function;
  stopTimer: Function;
}

const TodoTimeInteraction = ({
  activeTodo,
  setDone,
  postponeOptions,
  setPostpone,
  displayTime,
  handleOnToggle,
  buttonConfig,
  stopTimer,
}: ComponentTodo): ReactElement => {
  const [isPostpone] = useAtom(postponeClicked);
  const [, setIsOnProgressAtom] = useAtom(isOnProgress);

  useEffect(() => {
    return () => {
      setIsOnProgressAtom('relaxing');
      stopTimer();
    };
  }, []);

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
