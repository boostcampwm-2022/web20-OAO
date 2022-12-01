import { ReactElement, useMemo, memo } from 'react';
import styled from 'styled-components';

import Text from '@components/Text';

import { getTodoUntilText } from '@util/Common';

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
`;

const TodoTimeText = ({ until, displayTime }: { until: string; displayTime: string }): ReactElement => {
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

export default memo(TodoTimeText);
