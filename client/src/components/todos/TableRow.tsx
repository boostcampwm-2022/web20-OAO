import { ReactElement, useState, useEffect, memo } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { PlainTodo } from '@todo/todo.type';
import { todoList } from '@util/GlobalState';
import { PRIMARY_COLORS } from '@util/Constants';

import TableRowHeader from '@components/todos/TableRowHeader';
import TableRowDetail from '@components/todos/TableRowDetail';
import EditModal from '@container/EditModal';

const { lightGray } = PRIMARY_COLORS;

const RowWrapper = styled.div`
  div:nth-child(1):hover {
    background-color: ${lightGray};
  }
`;

const TableRow = ({ todo }: { todo: PlainTodo }): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [prevTodoList, setPrevTodo] = useState<PlainTodo[]>([]);
  const [nextTodoList, setNextTodo] = useState<PlainTodo[]>([]);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [hasEditModal, setHasEditModal] = useState(false);

  useEffect(() => {
    setPrevTodo(() => []);
    setNextTodo(() => []);
    todo.prev.forEach((prevTodoId: string) => {
      todoListAtom
        .getTodoById(prevTodoId)
        .then((prevTodo: PlainTodo | undefined) => {
          if (prevTodo !== undefined) setPrevTodo((prevState) => [...prevState, prevTodo]);
        })
        .catch((err) => toast.error(err));
    });
    todo.next.forEach((nextTodoId: string) => {
      todoListAtom
        .getTodoById(nextTodoId)
        .then((nextTodo: PlainTodo | undefined) => {
          if (nextTodo !== undefined) setNextTodo((prevState) => [...prevState, nextTodo]);
        })
        .catch((err) => toast.error(err));
    });
  }, [todo]);

  return (
    <>
      <RowWrapper>
        <TableRowHeader
          todo={todo}
          prevTodoList={prevTodoList}
          nextTodoList={nextTodoList}
          onClick={() => setDisplayDetail(!displayDetail)}
          setHasEditModal={setHasEditModal}
        />
        {displayDetail && <TableRowDetail todo={todo} prevTodoList={prevTodoList} nextTodoList={nextTodoList} />}
      </RowWrapper>
      {hasEditModal && <EditModal setHasEditModal={setHasEditModal} editingTodoId={todo.id} />}
    </>
  );
};

export default memo(TableRow);
