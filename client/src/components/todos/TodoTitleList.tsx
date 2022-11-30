import { ReactElement } from 'react';
import { PlainTodo } from '@todo/todo.type';

const TodoTitleList = ({ list, prevId }: { list: PlainTodo[]; prevId: string }): ReactElement => {
  return (
    <ul>
      {list.map((todo: PlainTodo) => {
        return <li key={todo.id + prevId}>{todo.title}</li>;
      })}
    </ul>
  );
};
export default TodoTitleList;
