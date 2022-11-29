import { PlainTodo } from '@core/todo/todoList';
import { ReactElement } from 'react';
import TodoTitleList from '@components/todos/TodoTitleList';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: left;
  margin: 10px;
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
    <>
      <div></div>
      <Wrapper>
        {todo.content !== '' && (
          <>
            <h3>상세 내용</h3>
            <p>{todo.content}</p>
          </>
        )}
        {prevTodoList.length > 0 && (
          <>
            <h3>먼저 할일 목록</h3>
            <TodoTitleList list={prevTodoList} />
          </>
        )}
        {nextTodoList.length > 0 && (
          <>
            <h3>이어서 할일 목록</h3>
            <TodoTitleList list={nextTodoList} />
          </>
        )}
      </Wrapper>
    </>
  );
};
export default TableRowDetail;
