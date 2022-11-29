import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import TableHeader from '@components/todos/TableHeader';
import TableRow from '@components/todos/TableRow';
import { useAtom } from 'jotai';
import { PlainTodo } from '@core/todo/todoList';
import { todoList, displayDetailAtom } from '@util/GlobalState.js';

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
  grid-template-columns: 1fr 3.5fr 1fr 2fr 1fr 2fr 2fr 1fr;
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

  useEffect(() => {
    todoListAtom
      .getSortedRTL()
      .then((sortedTodoList: PlainTodo[]) => {
        setTodos([...sortedTodoList]);
      })
      .catch((err) => console.error(err));
  }, [todoListAtom]);

  return todos.length > 0 ? (
    <Wrapper>
      <GridWrapper>
        <TableHeader />
      </GridWrapper>
      <RowWrapper>
        {todos.map((todo: PlainTodo) => (
          <GridRowWrapper
            onClick={() => {
              // displayDetail === todo.id ? setDisplayDetail('') : setDisplayDetail(todo.id);
              if (displayDetail !== todo.id) setDisplayDetail(todo.id);
            }}
            key={todo.id}
          >
            <TableRow todo={todo} />
          </GridRowWrapper>
        ))}
      </RowWrapper>
    </Wrapper>
  ) : (
    <BlankTableWrapper>
      <h1>Todo가 없습니다!</h1>
      <h2>Todo를 추가해보는 건 어떨까요?</h2>
    </BlankTableWrapper>
  );
};

export default Table;
