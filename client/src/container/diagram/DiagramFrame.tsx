import { ReactElement, Suspense, useState } from 'react';
import styled from 'styled-components';
import Diagram from '@container/diagram/Diagram';
import DiagramControlPanel from '@components/diagram/DiagramControlPanel';

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const DiagramFrame = (): ReactElement => {
  const [showDone, setShowDone] = useState(false);
  const onClick = (): void => {
    setShowDone((prev) => !prev);
  };
  return (
    <>
      <DiagramControlPanel isActive={showDone} onClick={onClick} />
      <Wrapper>
        <Suspense fallback={'Loading diagram...'}>
          <Diagram showDone={showDone} />
        </Suspense>
      </Wrapper>
    </>
  );
};

export default DiagramFrame;
