import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import TableHeader from '@components/todos/TableHeader';
import TableRow from '@components/todos/TableRow';
import { useAtom } from 'jotai';
import { PlainTodo } from '@todo/todo.type';
import { todoList } from '@util/GlobalState.js';
import { toast } from 'react-toastify';

const TableWrapper = styled.table`
  width: 80vw;
  border-collapse: collapse;
  th,
  td {
    border-bottom: 2px solid #e2e2e2;
    text-align: center;
  }
`;

const NoneTodoWrapper = styled.div`
  margin: 10% 0;
`;

const TheadWrapper = styled.thead`
  line-height: 3rem;
`;

const Table = (): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [todos, setTodos] = useState<PlainTodo[]>([]);
  const [filter, setFilter] = useState<'DONE' | 'READY' | 'WAIT'>('READY');
  const [sort, setSort] = useState<Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>>(new Map());

  useEffect(() => {
    todoListAtom
      .getSortedList(
        filter,
        [...sort]
          .map((el) => ({ type: el[0], direction: el[1] }))
          .filter((el) => el.direction !== 'NONE')
          .reverse(),
      )
      .then((sortedTodoList: PlainTodo[]) => {
        setTodos(() => {
          return [...sortedTodoList];
        });
      })
      .catch((err) => toast.error(err));
  }, [todoListAtom, filter, sort]);

  return (
    <>
      <TableWrapper>
        <colgroup>
          <col width={'*'} />
          <col width={'20%'} />
          <col width={'*'} />
          <col width={'*'} />
          <col width={'*'} />
          <col width={'*'} />
          <col width={'*'} />
          <col width={'*'} />
        </colgroup>
        <TheadWrapper>
          <TableHeader filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        </TheadWrapper>
        {todos.length > 0 && (
          <tbody>
            {todos.map((todo: PlainTodo) => (
              <TableRow key={todo.id} todo={todo} />
            ))}
          </tbody>
        )}
      </TableWrapper>
      {todos.length === 0 && (
        <NoneTodoWrapper>
          <h1 style={{ width: '100%' }}>Todo가 없습니다!</h1>
        </NoneTodoWrapper>
      )}
    </>
  );
};

export default Table;
