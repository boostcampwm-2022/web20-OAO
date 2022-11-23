import { uuid } from 'uuidv4';

export type TestTodo = {
  id: string; // UUIDv4, 할일의 고유 id
  title: string; // VARCHAR(255), 할일의 이름
  content: string; // TEXT, 할일의 상세 내용
  owner: string; // UUIDv4, 할일 소유자의 id
  importance: number; // INT or ENUM, 할일의 우선순위 레벨
  until: Date; // DATE, 할일의 마감기한
  from: Date; // DATE, 할일의 시작기한
  prev: Array<string>; // or Array<string>, 이전에 반드시 완료되어야 하는 할일 id 배열
  next: Array<string>; // or Array<string>, 본 할일 이후에 실행되어야 하는 할일 id 배열
  lastPostponed: Date;
  state: 'READY' | 'DONE' | 'WAIT';
};

const toTestTodo = (todo: any): TestTodo => ({
  id: (todo.id as string) || uuid(),
  title: (todo.title as string) || 'default title',
  content: (todo.content as string) || 'default content',
  owner: (todo.owner as string) || 'default user',
  importance: (todo.importance as number) || 1,
  until: todo.until ? new Date(todo.until) : new Date(2077, 1, 1),
  from: todo.from ? new Date(todo.from) : new Date(1994, 1, 1),
  prev: todo.prev || [],
  next: todo.next || [],
  lastPostponed: todo.lastPostponed ? new Date(todo.lastPostponed) : new Date(),
  state: todo.state || 'READY',
});

const toComparableTestTodo = (todo: TestTodo) => ({
  ...todo,
  until: todo.until.toString(),
  from: todo.from.toString(),
  lastPostponed: todo.lastPostponed.toString(),
});

export { toTestTodo, toComparableTestTodo };
