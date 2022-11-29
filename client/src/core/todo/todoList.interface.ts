import { PlainTodo, InputTodo } from '@todo/todo.type';
export interface ITodoList {
  // TEST 전용
  updateAll: (date?: Date) => Promise<ITodoList>; // test용
  getSortedRTL: (today?: Date) => Promise<PlainTodo[]>; // test용
  getTL: () => PlainTodo[]; // test용
  // READ
  getActiveTodo: () => Promise<PlainTodo>;
  getSortedList: (type: 'READY' | 'WAIT' | 'DONE', compareArr: string[]) => Promise<PlainTodo[]>;
  getSummary: () => any;
  getTodoById: (id: string) => Promise<PlainTodo | undefined>;
  // CREATE, UPDATE, DELETE
  postponeTemporally: () => Promise<ITodoList>;
  postponeDeadline: () => Promise<ITodoList>;
  postponeForToday: () => Promise<ITodoList>;
  lowerImportance: () => Promise<ITodoList>;
  setDone: () => Promise<ITodoList>;
  updateElapsedTime: (elapsedTime: number) => Promise<ITodoList>;
  add: (todo: InputTodo) => Promise<ITodoList>;
  edit: (id: string, todo: InputTodo) => Promise<ITodoList>;
  remove: (id: string) => Promise<ITodoList>;
}
