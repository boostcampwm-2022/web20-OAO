import { ReactElement, useState, useEffect } from 'react';
import TableRowHeader from '@components/todos/TableRowHeader';
import TableRowDetail from '@components/todos/TableRowDetail';
import { PlainTodo } from '@todo/todo.type';
import { todoList } from '@util/GlobalState';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

const TableRow = ({ todo }: { todo: PlainTodo }): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [prevTodoList, setPrevTodo] = useState<PlainTodo[]>([]);
  const [nextTodoList, setNextTodo] = useState<PlainTodo[]>([]);
  const [displayDetail, setDisplayDetail] = useState(false);

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
    <div>
      <TableRowHeader
        todo={todo}
        prevTodoTitle={prevTodoList[0]?.title}
        nextTodoTitle={nextTodoList[0]?.title}
        onClick={() => setDisplayDetail(!displayDetail)}
      />
      {displayDetail && <TableRowDetail todo={todo} prevTodoList={prevTodoList} nextTodoList={nextTodoList} />}
    </div>
  );
};

export default TableRow;
