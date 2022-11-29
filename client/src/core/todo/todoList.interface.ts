import { PlainTodo, InputTodo } from '@todo/todo.type';

export interface ITodoList {
  getActiveTodo: () => Promise<PlainTodo>;
  getSortedRTL: (today?: Date) => Promise<PlainTodo[]>; // test용
  postponeTemporally: () => Promise<ITodoList>;
  postponeDeadline: () => Promise<ITodoList>;
  postponeForToday: () => Promise<ITodoList>;
  lowerImportance: () => Promise<ITodoList>;
  setDone: () => Promise<ITodoList>;
  updateElapsedTime: (elapsedTime: number) => Promise<ITodoList>;
  getSummary: () => any;
  updateAll: (date?: Date) => Promise<ITodoList>; // test용
  getTL: () => PlainTodo[]; // test용
  add: (todo: InputTodo) => Promise<ITodoList>;
  edit: (id: string, todo: InputTodo) => Promise<ITodoList>;
  remove: (id: string) => Promise<ITodoList>;
  getSortedList: (type: 'READY' | 'WAIT' | 'DONE', compareArr: string[]) => Promise<PlainTodo[]>;
  getTodoById: (id: string) => Promise<PlainTodo | undefined>;
}

export interface ITodoListDataBase {
  get: (id: string) => Promise<PlainTodo>;
  getAll: () => Promise<PlainTodo[]>;
  add: (todo: InputTodo) => Promise<PlainTodo[]>;
  edit: (id: string, todo: InputTodo) => Promise<PlainTodo[]>;
  remove: (id: string) => Promise<PlainTodo[]>;
}
