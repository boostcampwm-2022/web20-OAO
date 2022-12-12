import { ReactElement, memo } from 'react';
import Text from '@components/Text';
import Image from '@components/Image';

import { useGlobalAtom } from '@util/GlobalAtomContext';
import { useAtom } from 'jotai';

import Working from '@images/Working.svg';
import Relaxing from '@images/Relaxing';

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

const transform = 'translateY(54px)';

const TodoStatus = (): ReactElement => {
  const { isOnProgress, asyncActiveTodo } = useGlobalAtom();
  const [userState] = useAtom(isOnProgress);
  const [activeTodo] = useAtom(asyncActiveTodo);

  return (
    <>
      <Wrapper>
        <Text
          text={todoStatusText(activeTodo?.until?.toString())}
          fontFamily={'roboto'}
          fontSize={'18px'}
          fontWeight={'700'}
        />
        {userState === 'working' ? <Image src={Working} transform={transform} /> : <Relaxing transform={transform} />}
        <BlankBox />
      </Wrapper>
      <Hr />
    </>
  );
};

export default memo(TodoStatus);
