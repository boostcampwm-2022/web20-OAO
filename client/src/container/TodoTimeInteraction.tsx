import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import styled from 'styled-components';

import PostponeBox from '@components/PostponeBox';
import TodoInteractionButton from '@components/TodoInteractionButton';
import TodoTimeText from '@components/TodoTimeText';

import { InputTodo } from '@core/todo/todoList.js';

import { isOnProgress, postponeClicked } from '@util/GlobalState';

import useTodoList from '../hooks/useTodoList';
import useElapsedTime from '../hooks/useElapsedTime';
import useButtonConfig from '../hooks/useButtonConfig';

const Wrapper = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TodoTimeInteraction = ({ activeTodo }: { activeTodo: InputTodo }): ReactElement => {
  const [isPostpone] = useAtom(postponeClicked);
  const [userState] = useAtom(isOnProgress);
  const [setPostpone, , postponeOptions] = useTodoList();
  const [, , , time, setTime] = useElapsedTime();
  const [buttonConfig, handleOnToggle] = useButtonConfig(userState);

  return (
    <Wrapper>
      <TodoInteractionButton buttonConfig={buttonConfig} handleOnToggle={handleOnToggle} />
      {activeTodo.until !== undefined && <TodoTimeText until={activeTodo.until.toString()} />}
      {isPostpone && (
        <PostponeBox
          postponeOptions={postponeOptions}
          setPostpone={setPostpone}
          time={time}
          setTime={setTime}
          handleOnToggle={handleOnToggle}
        />
      )}
    </Wrapper>
  );
};

export default TodoTimeInteraction;
