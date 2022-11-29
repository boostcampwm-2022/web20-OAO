import { ReactElement } from 'react';
import styled from 'styled-components';
import TodosHeader from '@container/TodosHeader';
import Table from '@container/Table';

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Todos = (): ReactElement => {
  return (
    <Wrapper>
      <TodosHeader />
      <Table />
    </Wrapper>
  );
};

export default Todos;
