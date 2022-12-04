import { PlainTodo } from '@todo/todo.type';
import { ReactElement } from 'react';
import TodoTitleList from '@components/todos/TodoTitleList';
import styled from 'styled-components';

const TrWrapper = styled.tr`
  border-bottom: 2px solid #e2e2e2;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 20% 0;
  text-align: left;
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
  const getAbsenceTodoDetailText = (): string => {
    if (todo.content === '' && prevTodoList.length === 0 && nextTodoList.length === 0) return '상세정보가 없습니다 😚';
    return '';
  };

  return (
    <TrWrapper>
      <th></th>
      <Wrapper>
        <SubTitle>
          <h2>{getAbsenceTodoDetailText()}</h2>
        </SubTitle>
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
        {}
      </Wrapper>
    </TrWrapper>
  );
};
export default TableRowDetail;
