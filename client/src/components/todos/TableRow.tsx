import { ReactElement, useState, useEffect } from 'react';
import TableRowHeader from '@components/todos/TableRowHeader';
import TableRowDetail from '@components/todos/TableRowDetail';
import { PlainTodo } from '@core/todo/todoList';
import { displayDetailAtom, todoList } from '@util/GlobalState';
import { useAtom } from 'jotai';

const TableRow = ({ todo }: { todo: PlainTodo }): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [displayDetail] = useAtom(displayDetailAtom);
  const [prevTodoList, setPrevTodo] = useState<PlainTodo[] | []>([]);
  const [nextTodoList, setNextTodo] = useState<PlainTodo[] | []>([]);

  useEffect(() => {
    todo.prev.map((prevTodoId: string) => {
      todoListAtom
        .getTodoById(prevTodoId)
        .then((prevTodo: PlainTodo | undefined) => {
          prevTodo != null ? setPrevTodo([...prevTodoList, prevTodo]) : setPrevTodo([]);
        })
        .catch((err) => console.error(err));
    });
    todo.next.map((nextTodoId: string) => {
      todoListAtom
        .getTodoById(nextTodoId)
        .then((nextTodo: PlainTodo | undefined) => {
          nextTodo != null ? setNextTodo([...nextTodoList, nextTodo]) : setNextTodo([]);
        })
        .catch((err) => console.error(err));
    });
  }, [todoListAtom]);

  return (
    <>
      <TableRowHeader todo={todo} prevTodoTitle={prevTodoList[0]?.title} nextTodoTitle={nextTodoList[0]?.title} />
      {displayDetail === todo.id && (
        <TableRowDetail todo={todo} prevTodoList={prevTodoList} nextTodoList={nextTodoList} />
      )}
    </>
  );
};

export default TableRow;
