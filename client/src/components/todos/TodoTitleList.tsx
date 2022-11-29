import { ReactElement } from 'react';
import { PlainTodo } from '@core/todo/todoList';

const TodoTitleList = ({ list }: { list: PlainTodo[] }): ReactElement => {
  return (
    <ul>
      {list.map((todo: PlainTodo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
};
export default TodoTitleList;
