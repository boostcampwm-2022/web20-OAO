import { TodoList } from '@core/todo/todoList';

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
