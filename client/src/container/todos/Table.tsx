import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { PlainTodo } from '@todo/todo.type';
import { useGlobalAtom } from '@util/GlobalAtomContext';

import TableHeader from '@components/todos/TableHeader';
import TableRow from '@components/todos/TableRow';
import BlankTableInform from '@components/todos/BlankTableInform';

const Wrapper = styled.div`
  width: 85%;
  height: 90%;
  overflow-y: auto;
  position: relative;
`;

const Table = (): ReactElement => {
  const { todoList } = useGlobalAtom();
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
    <Wrapper>
      <TableHeader filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      {todos.length > 0 ? todos.map((todo: PlainTodo) => <TableRow key={todo.id} todo={todo} />) : <BlankTableInform />}
    </Wrapper>
  );
};

export default Table;
