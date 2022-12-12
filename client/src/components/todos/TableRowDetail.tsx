import { ReactElement } from 'react';
import styled from 'styled-components';

import { PRIMARY_COLORS, TABLE_ROW_DETAIL_TYPE } from '@util/Constants';
import { isPlainTodo } from '@util/Common';
import { PlainTodo } from '@todo/todo.type';

import TodoTitleList from '@components/todos/TodoTitleList';

const { gray } = PRIMARY_COLORS;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #e2e2e2;
`;

const DetailWrapper = styled.div`
  text-align: left;
  flex-basis: fit-content;
`;

const BlankDiv = styled.div`
  width: 55px;
`;

const SubTitle = styled.h3`
  font-family: 'Noto Sans';
`;

const BlankDetailText = styled.p`
  margin: 20px;
  color: ${gray};
`;

const TalbleDetailElement = (type: string, info: PlainTodo | PlainTodo[]): ReactElement => {
  return (
    <>
      <SubTitle>{TABLE_ROW_DETAIL_TYPE[type as keyof typeof TABLE_ROW_DETAIL_TYPE]}</SubTitle>
      {isPlainTodo(info) ? <p>{info.content}</p> : <TodoTitleList list={info} />}
    </>
  );
};

const TableRowDetail = ({
  todo,
  prevTodoList,
  nextTodoList,
}: {
  todo: PlainTodo;
  prevTodoList: PlainTodo[];
  nextTodoList: PlainTodo[];
}): ReactElement => {
  return (
    <Wrapper>
      <BlankDiv />
      <DetailWrapper>
        {todo.content === '' && todo.prev.length === 0 && todo.next.length === 0 && (
          <BlankDetailText>할 일의 상세내용이 존재하지 않습니다</BlankDetailText>
        )}
        {todo.content !== '' && TalbleDetailElement('nowTodo', todo)}
        {prevTodoList.length > 0 && TalbleDetailElement('prevTodoList', prevTodoList)}
        {nextTodoList.length > 0 && TalbleDetailElement('nextTodoList', nextTodoList)}
      </DetailWrapper>
    </Wrapper>
  );
};
export default TableRowDetail;
