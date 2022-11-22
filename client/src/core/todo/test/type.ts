import { uuid } from 'uuidv4';

const testToday = new Date();
const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;

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

const generateTodoForSortTest = (): TestTodo =>
  toTestTodo({
    id: uuid(),
    importance: Math.ceil(Math.random() * 3),
    until: new Date(testToday.getTime() + Math.floor(Math.random() * WEEK)),
    from: new Date(1994, 10, 5),
  });

const generateTodoListForSortTest = (length: number): Array<TestTodo> =>
  Array.from({ length }, () => generateTodoForSortTest());

// update
const START = new Date('2022-8-31');
const END = new Date('2022-12-31');

const getRandomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getDistantDate = (date: Date): Date => new Date(date.getTime() + Math.floor(Math.random() * WEEK));

const getRandomState = (): 'READY' | 'DONE' | 'WAIT' =>
  // eslint-disable-next-line no-nested-ternary
  Math.random() < 0.5 ? 'DONE' : Math.random() < 0.5 ? 'READY' : 'WAIT';

const generateRandomTodo = (id: string | undefined): TestTodo => {
  const from = getRandomDate(START, END);
  const until = getDistantDate(from);
  return toTestTodo({
    id,
    from,
    until,
    state: getRandomState(),
  });
};

const getRandomIndex = (length: number, index: number, numNext: number): number =>
  Math.ceil(Math.random() * (length - index - numNext));

const getTodoIdFromNextElement = (
  length: number,
  index: number,
  numNext: number,
  arr: Array<TestTodo>,
): { idx: Array<number>; next: Array<string> } => {
  if (index + numNext >= length) return { next: [], idx: [] };

  const idx = Array.from({ length: numNext }, () => getRandomIndex(length, index, numNext))
    .sort((a, b) => a - b)
    .map((el, i) => el + i + index);

  const next = idx.map((el) => arr[el].id);
  return { idx, next };
};

const generateRandomNumber = (p: number, max: number) => {
  let num = 0;
  const addNextNum = () => {
    if (num < max && Math.random() > p) {
      num += 1;
      addNextNum();
    }
  };
  addNextNum();
  return num;
};

const generateTodoListForUpdateTest = (length: number): Array<TestTodo> => {
  const todos: Array<TestTodo> = Array.from({ length }, (el, i) => generateRandomTodo(i.toString()));
  todos.forEach((el, i) => {
    const { idx, next } = getTodoIdFromNextElement(
      length,
      i,
      generateRandomNumber(0.5, Math.min(length - i, 5)),
      todos,
    );
    todos[i].next = next;
    idx.forEach((nextIdx) => {
      todos[nextIdx].prev.push(todos[i].id);
    });
  });

  return todos;
};

export { toTestTodo, testToday, generateTodoListForSortTest, generateTodoListForUpdateTest };
