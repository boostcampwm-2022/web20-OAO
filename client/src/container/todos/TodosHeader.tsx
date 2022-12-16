import { ReactElement, memo } from 'react';
import Text from '@components/Text';
import styled from 'styled-components';
import Waiting from '@images/Waiting';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const TodosHeader = (): ReactElement => {
  return (
    <Wrapper>
      <Text textAlign={'left'} margin={'0 25px'} text="할일 전체보기" />
      <Waiting />
    </Wrapper>
  );
};
export default memo(TodosHeader);
