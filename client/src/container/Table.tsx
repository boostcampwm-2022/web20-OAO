import { ReactElement } from 'react';
import styled from 'styled-components';
import TableRow from '@components/TableRow';
import TableHeader from '@components/TableHeader';

const Wrapper = styled.div`
  width: 85%;
`;

const GridWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3.5fr 1fr 2fr 1fr 2fr 2fr 1fr;
  border-bottom: 2px solid #e2e2e2;
  text-align: center;
  p {
    margin: 10px 0;
  }
  #hi:hover {
    background-color: #333333;
  }
`;

const RowWrapper = styled.div`
  ${GridWrapper}:hover {
    background-color: #e2e2e2;
  }
`;

const Table = (): ReactElement => {
  return (
    <Wrapper>
      <GridWrapper>
        <TableHeader />
      </GridWrapper>
      <RowWrapper>
        <GridWrapper>
          <TableRow />
        </GridWrapper>
      </RowWrapper>
    </Wrapper>
  );
};

export default Table;
