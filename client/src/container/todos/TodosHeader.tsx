import { ReactElement } from 'react';
import Waiting from '@images/Waiting.svg';
import Image from '@components/Image';
import Text from '@components/Text';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const TodosHeader = (): ReactElement => {
  return (
    <Wrapper>
      <Text textAlign={'left'} margin={'0 25px'} text="할일 전체보기" />
      <Image src={Waiting} />
    </Wrapper>
  );
};
export default TodosHeader;
