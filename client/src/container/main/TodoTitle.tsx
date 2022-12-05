import { ReactElement, memo } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import Text from '@components/Text';

import { asyncActiveTodo } from '@util/GlobalState';

const Wrapper = styled.div`
  width: 850px;
  text-align: center;
`;

const TodoTitle = (): ReactElement => {
  const [activeTodo] = useAtom(asyncActiveTodo);

  return (
    <Wrapper>
      <Text text={activeTodo?.title} fontSize={'54px'} fontWeight={'700'} margin={'35px 0'} />
    </Wrapper>
  );
};
export default memo(TodoTitle);
