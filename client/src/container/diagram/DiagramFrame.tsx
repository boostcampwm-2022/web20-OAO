import { ReactElement, Suspense } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLORS } from '@util/Constants';
import Diagram from '@container/diagram/Diagram';

const { darkestGray, offWhite } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  border-top: 2px solid ${darkestGray};
  background-color: ${offWhite};
  overflow-x: auto;
  overflow-y: auto;
`;
const DiagramFrame = (): ReactElement => {
  return (
    <Wrapper>
      <Suspense fallback={'Loading diagram...'}>
        <Diagram />
      </Suspense>
    </Wrapper>
  );
};

export default DiagramFrame;
