import { Todo } from '@todo/todo';

export interface SortCommand {
  type: string;
  direction: 'ASCEND' | 'DESCEND' | 'NONE';
}

export type CompareFunc = (a: Todo, b: Todo, today?: Date) => number;

export interface CompareFuncObj {
  [id: string]: CompareFunc;
}
