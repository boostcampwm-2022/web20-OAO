import { Dispatch, MouseEvent, ReactElement, ReactNode, SetStateAction, useRef } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  ref: any;
}

const StyledOverlay = styled.div<WrapperProps>`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ModalProps {
  setHasModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const OverLay = ({ setHasModal, children }: ModalProps): ReactElement => {
  const overLayRef = useRef();

  const handle = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === overLayRef.current) {
      setHasModal(false);
    }
  };

  return (
    <StyledOverlay ref={overLayRef} onClick={handle}>
      {children}
    </StyledOverlay>
  );
};

export default OverLay;
