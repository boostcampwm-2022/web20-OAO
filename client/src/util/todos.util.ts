import { PlainTodo } from '@todo/todo.type';
import ColoredDone from '@images/ColoredDone.svg';
import ColoredReady from '@images/ColoredReady.svg';
import ColoredWait from '@images/ColoredWait.svg';
import ColoredPostponed from '@images/ColoredPostponed.svg';
import { TodoList } from '@todo/todoList';
import { toast } from 'react-toastify';
import { SetStateAction } from 'jotai';

export const getListInfoText = (todoList: PlainTodo[]): string => {
  const numberOfTitleLength = 6;
  const listLength = todoList?.length;
  if (listLength === 0) return '-';

  const firstTodoTitle = todoList[0].title;
  const shortenTodoTitle =
    firstTodoTitle.length > numberOfTitleLength
      ? [firstTodoTitle.slice(0, numberOfTitleLength), '...'].join('')
      : firstTodoTitle;
  return listLength === 1 ? shortenTodoTitle : [shortenTodoTitle, '외', listLength - 1].join(' ');
};

export type FilterType = 'READY' | 'WAIT' | 'DONE';

export const getTodoStateIcon = (todo: PlainTodo): string => {
  if (todo.state === 'DONE') return ColoredDone;
  if (todo.state === 'READY') return ColoredReady;
  if (todo.from.getTime() > new Date().getTime()) return ColoredPostponed;
  return ColoredWait;
};

export const getCheckTodoStateHandler = (
  todo: PlainTodo,
  todoListAtom: TodoList,
  setTodoListAtom: (update: SetStateAction<TodoList>) => void,
): ((event: React.MouseEvent) => void) => {
  return (event) => {
    let newTodo = {};
    event.stopPropagation();
    if (todo.state === 'DONE') newTodo = { ...todo, state: 'READY' };
    else if (todo.state === 'READY') newTodo = { ...todo, state: 'DONE' };
    else if (todo.from.getTime() > new Date().getTime()) {
      toast.error('오늘 하루 동안 보지 않기로 설정한 할일입니다.');
      return;
    } else {
      toast.error('아직 먼저 할 일들이 끝나지 않은 할일입니다.');
      return;
    }
    newTodo = { ...todo, state: todo.state === 'DONE' ? 'WAIT' : 'DONE' };
    todoListAtom
      .edit(todo.id, newTodo)
      .then((newTodoList) => {
        setTodoListAtom(newTodoList);
        toast.success('완료되었습니다.');
      })
      .catch((err) => toast.error(err));
  };
};
