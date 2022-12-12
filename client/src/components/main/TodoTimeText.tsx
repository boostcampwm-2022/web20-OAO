import { ReactElement, memo } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import Text from '@components/Text';
import ElapsedTimeText from '@components/ElapsedTimeText';

import { getTodoUntilText } from '@util/Common';
import { useGlobalAtom } from '@util/GlobalAtomContext';
import { PRIMARY_COLORS } from '@util/Constants';

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
`;

const TodoTimeText = (): ReactElement => {
  const { asyncActiveTodo } = useGlobalAtom();
  const [activeTodo] = useAtom(asyncActiveTodo);
  return (
    <TextWrapper>
      <Text text={getTodoUntilText(activeTodo?.until)} />
      <ElapsedTimeText color={PRIMARY_COLORS.darkGray} />
    </TextWrapper>
  );
};

export default memo(TodoTimeText);
