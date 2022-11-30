import { PlainTodo, InputTodo } from '@todo/todo.type';

export interface ITodoListDataBase {
  // Basic
  get: (id: string) => Promise<PlainTodo | undefined>;
  getAll: () => Promise<PlainTodo[]>;
  add: (todo: InputTodo) => Promise<PlainTodo[]>;
  edit: (id: string, todo: InputTodo) => Promise<PlainTodo[]>;
  editMany: (inputArr: Array<{ id: string; todo: InputTodo }>) => Promise<PlainTodo[]>;
  remove: (id: string) => Promise<PlainTodo[]>;
}
