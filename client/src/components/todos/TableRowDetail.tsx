import { PlainTodo } from '@todo/todo.type';
import { ReactElement } from 'react';
import TodoTitleList from '@components/todos/TodoTitleList';
import styled from 'styled-components';

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #e2e2e2;
`;

const Wrapper = styled.div`
  text-align: left;
  margin: 10px;
`;

const SubTitle = styled.h3`
  font-family: 'Noto Sans';
`;

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
    <DetailWrapper>
      <div style={{ width: '55px' }}></div>
      <Wrapper>
        {todo.content !== '' && (
          <>
            <SubTitle>상세 내용</SubTitle>
            <p>{todo.content}</p>
          </>
        )}
        {prevTodoList.length > 0 && (
          <>
            <SubTitle>먼저 할일 목록</SubTitle>
            <TodoTitleList list={prevTodoList} prevId={todo.id} />
          </>
        )}
        {nextTodoList.length > 0 && (
          <>
            <SubTitle>이어서 할일 목록</SubTitle>
            <TodoTitleList list={nextTodoList} prevId={todo.id} />
          </>
        )}
      </Wrapper>
    </DetailWrapper>
  );
};
export default TableRowDetail;
