import { ReactElement } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import { modalTypeAtom } from '@util/GlobalState';
import { TABLE_MODALS } from '@util/Constants';

import TableModal from '@container/todos/TableModal';
import Image from '@components/Image';
import Button from '@components/Button';
import TodosHeader from '@container/todos/TodosHeader';
import Table from '@container/todos/Table';

import Create from '../images/Create.svg';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const StyledButton = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 80px;
  height: 80px;
`;

const Todos = (): ReactElement => {
  const [modalType, setModalType] = useAtom(modalTypeAtom);

  const hanldeOnClick = (): void => {
    setModalType(TABLE_MODALS.create);
  };

  return (
    <Wrapper>
      <TodosHeader />
      <Table />
      <StyledButton>
        <Button context={<Image src={Create} height={'80px;'} width={'80px;'} />} onClick={hanldeOnClick} />
      </StyledButton>
      {modalType !== TABLE_MODALS.none && <TableModal />}
    </Wrapper>
  );
};

export default Todos;
