import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import styled from 'styled-components';

import Done from '../images/Done.svg';
import Postpone from '../images/Postpone.svg';
import Button from '../components/Button';
import Image from '../components/Image';
import Text from '../components/Text';

import { Todo } from '../core/todo/index';

import useButtonConfig from '../hooks/useButtonConfig';
import useElapsedTime from '../hooks/useElapsedTime';

import { getTodoUntilText } from '../util/Common';
import { isOnProgress } from '../util/GlobalState';

const Wrapper = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TodoTimeInteraction = ({ activeTodo }: { activeTodo: Todo }): ReactElement => {
  const [userState] = useAtom(isOnProgress);
  const [displayTime] = useElapsedTime();
  const [buttonConfig, handleOnToggle] = useButtonConfig(userState);

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button context={<Image src={buttonConfig.src} />} onClick={handleOnToggle} />
        <Button context={<Image src={Postpone} />} />
        <Button context={<Image src={Done} />} />
      </ButtonWrapper>
      <TextWrapper>
        <Text text={getTodoUntilText(activeTodo.until)} />
        <Text text={displayTime} />
      </TextWrapper>
    </Wrapper>
  );
};

export default TodoTimeInteraction;
