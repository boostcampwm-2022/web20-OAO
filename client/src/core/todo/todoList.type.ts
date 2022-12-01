import { Todo } from '@todo/todo';

export interface SortCommand {
  type: 'title' | 'until' | 'importance' | 'imminence' | 'lastpostponed';
  direction: 'ASCEND' | 'DESCEND' | 'NONE';
}

export type CompareFunc = (a: Todo, b: Todo) => number;

export interface CompareFuncObj {
  [id: string]: CompareFunc;
}
