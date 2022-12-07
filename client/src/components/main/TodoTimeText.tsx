import { ReactElement, memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue } from 'jotai';

import Text from '@components/Text';

import { getTodoUntilText } from '@util/Common';
import { elapsedTimeAtom, asyncActiveTodo } from '@util/GlobalState';

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
`;

const TodoTimeText = (): ReactElement => {
  const [activeTodo] = useAtom(asyncActiveTodo);
  const elapsedTime = useAtomValue(elapsedTimeAtom);
  const [displayTime, setDisplayTime] = useState('');
  const [time, setTime] = useAtom(elapsedTimeAtom);

  useEffect(() => {
    if (elapsedTime <= 0 && activeTodo !== undefined) {
      setTime(activeTodo?.elapsedTime);
    }
  }, [activeTodo]);

  useEffect(() => {
    const hour = Math.floor(time / 60 / 60);
    const minute = Math.floor((time % 3600) / 60);
    const second = time % 60;

    setDisplayTime(`소요시간: ${hour}h ${minute}m ${second}s`);
  }, [time]);

  return (
    <TextWrapper>
      <Text text={getTodoUntilText(activeTodo?.until)} />
      <Text text={displayTime.toString()} />
    </TextWrapper>
  );
};

export default memo(TodoTimeText);
