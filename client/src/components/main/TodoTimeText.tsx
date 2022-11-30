import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

import Text from '@components/Text';
import useElapsedTime from '../../hooks/useElapsedTime';
import { getTodoUntilText } from '@util/Common';

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
`;

const TodoTimeText = ({ until }: { until: string }): ReactElement => {
  const [displayTime] = useElapsedTime();

  const todoUntilText = useMemo(() => {
    return getTodoUntilText(until);
  }, [until]);

  return (
    <TextWrapper>
      <Text text={todoUntilText} />
      <Text text={displayTime} />
    </TextWrapper>
  );
};

export default TodoTimeText;
