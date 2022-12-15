import { ReactElement, Suspense, useState, memo } from 'react';
import styled from 'styled-components';

import Image from '@components/Image';
import Button from '@components/Button';
import TodosHeader from '@container/todos/TodosHeader';
import Table from '@container/todos/Table';

import Create from '@images/Create.svg';

import CreateModal from '@container/CreateModal';

const Wrapper = styled.div`
  height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const StyledButton = styled.div`
  position: fixed;
  bottom: 10vh;
  right: 5%;
  width: 80px;
  height: 80px;
`;

const Todos = (): ReactElement => {
  const [hasCreateModal, setHasCreateModal] = useState(false);

  return (
    <Suspense fallback={<div>loading</div>}>
      <Wrapper>
        <TodosHeader />
        <Table />
        <StyledButton>
          <Button
            context={<Image src={Create} height={'80px;'} width={'80px;'} />}
            onClick={() => setHasCreateModal(true)}
          />
        </StyledButton>
        {hasCreateModal && <CreateModal setHasCreateModal={setHasCreateModal} />}
      </Wrapper>
    </Suspense>
  );
};

export default memo(Todos);
