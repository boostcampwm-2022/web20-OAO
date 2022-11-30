import { ReactElement } from 'react';
import Text from '@components/Text';
import Image from '@components/Image';

import { PlainTodo } from '@core/todo/todoList.js';
import { isOnProgress } from '@util/GlobalState';
import { useAtom } from 'jotai';

import Working from '@images/Working.svg';
import Relaxing from '@images/Relaxing.svg';
import styled from 'styled-components';

import { todoStatusText } from '@util/Common';

const Wrapper = styled.div`
  width: 850px;
  padding: 0 6px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const Hr = styled.hr`
  border: 1px solid #3f3f3f;
  background-color: #3f3f3f;
  width: 850px;
`;

const BlankBox = styled.div`
  width: 54px;
  height: 21px;
`;

const TodoStatus = ({ activeTodo }: { activeTodo: PlainTodo }): ReactElement => {
  const [userState] = useAtom(isOnProgress);
  return (
    <>
      <Wrapper>
        <Text
          text={todoStatusText(activeTodo.until.toString())}
          fontFamily={'roboto'}
          fontSize={'18px'}
          fontWeight={'700'}
        />
        <Image src={userState === 'working' ? Working : Relaxing} transform="translateY(54px)" />
        <BlankBox />
      </Wrapper>
      <Hr />
    </>
  );
};

export default TodoStatus;
