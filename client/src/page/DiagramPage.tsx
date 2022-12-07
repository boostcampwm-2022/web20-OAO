import { ReactElement } from 'react';
import styled from 'styled-components';
import DiagramHeader from '@container/diagram/DiagramHeader';
import Diagram from '@container/diagram/Diagram';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const DiagramPage = (): ReactElement => {
  return (
    <Wrapper>
      <DiagramHeader />
      <Diagram />
    </Wrapper>
  );
};

export default DiagramPage;
