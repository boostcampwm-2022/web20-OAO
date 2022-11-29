import { PlainTodo, InputTodo } from '@todo/todoList.type';

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
  getSortedList: (type: 'READY' | 'WAIT' | 'DONE', compareArr: string[]) => Promise<ITodoList>;
  getTodoById: (id: string) => Promise<PlainTodo | undefined>;
}
