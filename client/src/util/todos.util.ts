import { PlainTodo } from '@todo/todo.type';
import { CSSProperties } from 'react';
import { gethhmmFormat, getyyyymmddDateFormat } from './Common';

interface HeaderElem {
  type: string;
  style: CSSProperties;
  value: string;
}

interface ImportanceType {
  [key: string]: string;
}

interface DetailCssStyle {
  text: CSSProperties;
  title: CSSProperties;
  content: CSSProperties;
  null: CSSProperties;
}
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

const TABLE_ROW_DETAIL_STYLES: DetailCssStyle = {
  text: { overflow: 'hidden', whiteSpace: 'nowrap' },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginRight: '10px',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    fontWeight: 700,
  },
  content: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: '0 10px',
  },
  null: {},
};

const TODO_STATE_TEXT: ImportanceType = {
  READY: '작업 가능',
  DONE: '완료',
  WAIT: '대기중',
};

const IMPORTANCE_ALPHABET: ImportanceType = {
  1: 'C',
  2: 'B',
  3: 'A',
};

interface HeaderElementData {
  todo: PlainTodo;
  prevTodoList: PlainTodo[];
  nextTodoList: PlainTodo[];
}

export const createHeaderElementData = ({ todo, prevTodoList, nextTodoList }: HeaderElementData): HeaderElem[] => {
  return [
    {
      type: 'title',
      style: TABLE_ROW_DETAIL_STYLES.title,
      value: todo.title,
    },
    {
      type: 'state',
      style: TABLE_ROW_DETAIL_STYLES.text,
      value: TODO_STATE_TEXT[todo.state],
    },
    {
      type: 'until',
      style: TABLE_ROW_DETAIL_STYLES.text,
      value: `${getyyyymmddDateFormat(todo.until, '.')} ${gethhmmFormat(todo.until)}`,
    },
    {
      type: 'importance',
      style: TABLE_ROW_DETAIL_STYLES.null,
      value: IMPORTANCE_ALPHABET[todo.importance],
    },
    {
      type: 'prev',
      style: TABLE_ROW_DETAIL_STYLES.content,
      value: getListInfoText(prevTodoList),
    },
    {
      type: 'next',
      style: TABLE_ROW_DETAIL_STYLES.content,
      value: getListInfoText(nextTodoList),
    },
  ];
};
