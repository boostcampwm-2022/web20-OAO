import { ReactElement, Suspense } from 'react';
import styled from 'styled-components';
import DiagramHeader from '@container/diagram/DiagramHeader';
import DiagramFrame from '@container/diagram/DiagramFrame';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DiagramPage = (): ReactElement => {
  return (
    <Wrapper>
      <DiagramHeader />
      <DiagramFrame />
    </Wrapper>
  );
};

export default DiagramPage;
