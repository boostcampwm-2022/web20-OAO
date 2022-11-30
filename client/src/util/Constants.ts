import { TodoList } from '@core/todo/todoList';

interface ImportanceType {
  [key: string]: string;
}

export const ACTIVE_TODO_STATE = {
  working: 'working',
  relaxing: 'relaxing',
};

export const POSTPONE_TEXTS = ['잠시 미루기', '하루 미루기', '우선순위 낮추기', '데드라인 미루기'];

export const POSTPONE_OPTIONS = {
  '잠시 미루기': '잠시 미루기',
  '하루 미루기': '하루 미루기',
  '우선순위 낮추기': '우선순위 낮추기',
  '데드라인 미루기': '데드라인 미루기',
};

export const POSTPONE_METHODS = {
  '잠시 미루기': async (todoList: TodoList) => {
    return await todoList.postponeTemporally();
  },
  '하루 미루기': async (todoList: TodoList) => {
    return await todoList.postponeForToday();
  },
  '우선순위 낮추기': async (todoList: TodoList) => {
    return await todoList.lowerImportance();
  },
  '데드라인 미루기': async (todoList: TodoList) => {
    return await todoList.postponeDeadline();
  },
};

export const PRIMARY_COLORS = {
  red: '#FE654F',
  white: '#FFFFFF',
  offWhite: '#FCFCFC',
  lightGray: '#E2E2E2',
  gray: '#5C5C5C',
  darkGray: '#3F3F3F',
  black: '#1D1D1D',
  brown: '#312317',
  blue: '#6C9A8B',
};

export const IMPORTANCE_ALPHABET: ImportanceType = {
  1: 'C',
  2: 'B',
  3: 'A',
};
export const TODO_STATE_TEXT: ImportanceType = {
  READY: '작업 가능',
  DONE: '완료',
  WAIT: '대기중',
};

export const INITIAL_TODO = { id: undefined, importance: 1, until: new Date() };

export enum TABLE_MODALS {
  create = 'create',
  update = 'update',
  delete = 'delete',
  none = 'none',
}

export const MODAL_INPUT_LIST = [
  { label: '제목', maxLength: 50, type: 'text' },
  { label: '상세 내용', maxLength: Number.MAX_VALUE, type: 'textarea' },
  { label: '마감일', type: 'date', maxLength: -1 },
  { label: '중요도', type: 'select', maxLength: -1 },
  { label: '먼저 할 일', maxLength: Number.MAX_VALUE, type: 'textarea' },
  { label: '이어서 할 일', maxLength: Number.MAX_VALUE, type: 'textarea' },
];

export const MODAL_LABEL_ID = {
  제목: 'title',
  '상세 내용': 'content',
  마감일: 'until',
  중요도: 'importance',
  '먼저 할 일': 'prev',
  '이어서 할 일': 'next',
};
