import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import TableHeader from '@components/todos/TableHeader';
import TableRow from '@components/todos/TableRow';
import { useAtom } from 'jotai';
import { PlainTodo } from '@todo/todo.type';
import { todoList, displayDetailAtom } from '@util/GlobalState.js';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  width: 85%;
`;

const BlankTableWrapper = styled.div`
  text-align: center;
  margin: 10%;
`;

const GridWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr 1fr 2fr 1fr 2fr 2fr 2fr;
  border-bottom: 2px solid #e2e2e2;
  text-align: center;
  p {
    margin: 10px 0;
  }
`;

const GridRowWrapper = styled(GridWrapper)`
  div:nth-child(10) {
    grid-column: 2/9;
  }
`;
const RowWrapper = styled.div`
  ${GridWrapper}:hover {
    background-color: #e2e2e2;
  }
`;

const Table = (): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [todos, setTodos] = useState<PlainTodo[]>([]);
  const [displayDetail, setDisplayDetail] = useAtom(displayDetailAtom);
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
      <GridWrapper>
        <TableHeader filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      </GridWrapper>
      {todos.length > 0 ? (
        <RowWrapper>
          {todos.map((todo: PlainTodo) => (
            <GridRowWrapper
              onClick={() => (displayDetail === todo.id ? setDisplayDetail('') : setDisplayDetail(todo.id))}
              key={todo.id}
            >
              <TableRow todo={todo} />
            </GridRowWrapper>
          ))}
        </RowWrapper>
      ) : (
        <BlankTableWrapper>
          <h1>Todo가 없습니다!</h1>
          <h2>Todo를 추가해보는 건 어떨까요?</h2>
        </BlankTableWrapper>
      )}
    </Wrapper>
  );
};

export default Table;
