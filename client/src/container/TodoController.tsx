import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useLocation } from 'react-router-dom';

import Text from '@components/Text';
import ElapsedTimeText from '@components/ElapsedTimeText';
import TodoInteractionButton from '@components/main/TodoInteractionButton';

import { asyncActiveTodo, isMainPageAtom, needTodoControllerAtom, postponeClicked } from '@util/GlobalState';
import { getTodoUntilText } from '@util/Common';
import { PRIMARY_COLORS } from '@util/Constants';
import PostponeBox from '@components/main/PostponeBox';

const { white, darkGray, offWhite } = PRIMARY_COLORS;

interface PropsType {
  active: boolean;
}
const Wrapper = styled.div<PropsType>`
  display: flex;
  height: 8vh;
  width: 100vw;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  align-items: center;
  color: ${white};
  background-color: ${darkGray};
  justify-content: space-between;
  position: fixed;
  bottom: ${(props) => (props.active ? '0vh' : '-8vh')};
  transition-property: bottom;
  transition-duration: 1s;
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
};

const TodoController = (): ReactElement => {
  const location = useLocation();

  const activeTodo = useAtomValue(asyncActiveTodo);
  const [needTodoController, setNeedTodoController] = useAtom(needTodoControllerAtom);
  const setIsMainPage = useSetAtom(isMainPageAtom);
  const isPostpone = useAtomValue(postponeClicked);

  useEffect(() => {
    setIsMainPage();
    setNeedTodoController();
  }, [location]);

  useEffect(() => {
    setNeedTodoController();
  }, [activeTodo]);

  return (
    <Wrapper active={needTodoController}>
      <ButtonWrapper>
        <TodoInteractionButton {...imageButtonStyle} />
        {isPostpone && needTodoController && <PostponeBox isBottom={true} />}
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
