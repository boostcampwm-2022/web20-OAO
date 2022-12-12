import { TABLE_MODALS } from '@util/Constants';
import { useGlobalAtom } from '@util/GlobalAtomContext';
import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import styled from 'styled-components';

const StyledOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

const { none } = TABLE_MODALS;

const OverLay = (): ReactElement => {
  const { modalTypeAtom } = useGlobalAtom();
  const [modalType, setModalType] = useAtom(modalTypeAtom);

  const hanldeOnClick = (): void => {
    setModalType(none);
  };

  return <>{modalType !== none && <StyledOverlay onClick={hanldeOnClick} />}</>;
};

export default OverLay;
