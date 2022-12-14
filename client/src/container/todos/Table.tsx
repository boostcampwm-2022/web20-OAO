import { ReactElement, useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { PlainTodo } from '@todo/todo.type';
import { todoList } from '@util/GlobalState.js';
import { Todo } from '@todo/todo';

import TableHeader from '@components/todos/TableHeader';
import TableRow from '@components/todos/TableRow';
import BlankTableInform from '@components/todos/BlankTableInform';
import { FilterType } from '@util/todos.util';

const Wrapper = styled.div`
  width: 85%;
  height: 90%;
  overflow-y: auto;
  position: relative;
`;

const getFilterCallback = (filterSet: Set<FilterType>): ((todo: Todo) => boolean) => {
  const filterArr = [...filterSet];
  return (todo: Todo): boolean => filterArr.some((el) => todo.state === el);
};

const Table = (): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [todos, setTodos] = useState<PlainTodo[]>([]);
  const [filter, setFilter] = useState<Set<FilterType>>(new Set(['READY']));
  const [sort, setSort] = useState<Map<string, 'NONE' | 'ASCEND' | 'DESCEND'>>(new Map());

  useEffect(() => {
    todoListAtom
      .getSortedListWithFilter(
        getFilterCallback(filter),
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

export default memo(Table);
