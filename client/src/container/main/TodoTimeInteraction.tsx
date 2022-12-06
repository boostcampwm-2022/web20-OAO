import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import styled from 'styled-components';

import PostponeBox from '@components/main/PostponeBox';
import TodoInteractionButton from '@components/main/TodoInteractionButton';
import TodoTimeText from '@components/main/TodoTimeText';

import { postponeClicked } from '@util/GlobalState';

const Wrapper = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TodoTimeInteraction = (): ReactElement => {
  const [isPostpone] = useAtom(postponeClicked);

  return (
    <Wrapper>
      <TodoInteractionButton />
      {isPostpone && <PostponeBox />}
      <TodoTimeText />
    </Wrapper>
  );
};

export default TodoTimeInteraction;
