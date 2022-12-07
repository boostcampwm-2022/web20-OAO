import { PRIMARY_COLORS } from '@util/Constants';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { getActiveTodoAtom } from '@util/GlobalState';
import { useAtomValue } from 'jotai';
import Text from '@components/Text';
import { getTodoUntilText } from '@util/Common';
import ElapsedTimeText from '@components/ElapsedTimeText';
import TodoInteractionButton from '@components/main/TodoInteractionButton';

const { white, darkGray, offWhite } = PRIMARY_COLORS;

const Wrapper = styled.div`
  display: flex;
  height: 8 vh;
  width: 100vw;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  align-items: center;
  color: ${white};
  background-color: ${darkGray};
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const imageButtonStyle = {
  fill: offWhite,
  stroke: offWhite,
  width: '45px',
  height: '45px',
};

const TodoController = (): ReactElement => {
  const activeTodo = useAtomValue(getActiveTodoAtom);

  return (
    <Wrapper>
      <ButtonWrapper>
        <TodoInteractionButton {...imageButtonStyle} />
      </ButtonWrapper>
      <Text text={activeTodo?.title} fontFamily="NanumMyeongjo" fontSize="24px" color={offWhite} />
      <TextWrapper>
        <Text text={getTodoUntilText(activeTodo?.until)} fontFamily="NanumMyeongjo" fontSize="1rem" color={offWhite} />
        <ElapsedTimeText color={offWhite} />
      </TextWrapper>
    </Wrapper>
  );
};

export default TodoController;
