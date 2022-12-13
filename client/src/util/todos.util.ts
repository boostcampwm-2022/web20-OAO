import { PlainTodo } from '@todo/todo.type';

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
