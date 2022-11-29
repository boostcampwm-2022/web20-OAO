import Image from '@components/Image';
import Button from '@components/Button';
import { ReactElement } from 'react';

import Create from '../images/Create.svg';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { modalTypeAtom } from '@util/GlobalState';
import { TABLE_MODALS } from '@util/Constants';
import TableModal from '@container/TableModal';

const StyledButton = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 80px;
  height: 80px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Table = (): ReactElement => {
  const [modalType, setModalType] = useAtom(modalTypeAtom);

  const hanldeOnClick = (): void => {
    console.log('create!');
    setModalType(TABLE_MODALS.create);
  };

  return (
    <Wrapper>
      table
      <StyledButton>
        <Button context={<Image src={Create} height={'80px;'} width={'80px;'} />} onClick={hanldeOnClick} />
      </StyledButton>
      {modalType !== TABLE_MODALS.none && <TableModal />}
    </Wrapper>
  );
};
export default Table;
