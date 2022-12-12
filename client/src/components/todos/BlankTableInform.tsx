import { ReactElement } from 'react';
import styled from 'styled-components';

const BlankTableWrapper = styled.div`
  text-align: center;
  margin: 10%;
`;

const BlankTableInform = (): ReactElement => {
  return (
    <BlankTableWrapper>
      <h1>Todo가 없습니다!</h1>
      <h2>Todo를 추가해보는 건 어떨까요?</h2>
    </BlankTableWrapper>
  );
};

export default BlankTableInform;
