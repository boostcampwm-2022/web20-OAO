import { TABLE_MODALS, PRIMARY_COLORS } from '@util/Constants';
import Text from '@components/Text';
import { modalTypeAtom } from '@util/GlobalState';
import { useAtom } from 'jotai';
import { memo, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const { create, update } = TABLE_MODALS;
const { offWhite } = PRIMARY_COLORS;

const Wrapper = styled.div`
  width: 50vw;
  height: 70vh;
  top: 150%;
  left: 21vw;
  position: absolute;
  background-color: ${offWhite};
  z-index: 100;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
`;

const TableModal = (): ReactElement => {
  const [modalType, setModalType] = useAtom(modalTypeAtom);
  const [modalHeader, setModalHeader] = useState('');

  useEffect(() => {
    if (modalType === create) {
      return setModalHeader('할 일 추가하기');
    }
    if (modalType === update) {
      return setModalHeader('할 일 수정하기');
    }
    setModalHeader('');
  }, [modalType]);

  return (
    <Wrapper>
      <Text text={modalHeader} />
    </Wrapper>
  );
};

export default memo(TableModal);
