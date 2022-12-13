import { PlainTodo } from '@todo/todo.type';
import ColoredDone from '@images/ColoredDone.svg';
import ColoredReady from '@images/ColoredReady.svg';
import ColoredWait from '@images/ColoredWait.svg';
import ColoredPostponed from '@images/ColoredPostponed.svg';

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
