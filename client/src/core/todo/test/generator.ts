import { Todo, PlainTodo } from '../todoList';

const testToday = new Date();
const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;

interface TestData {
  today: Date;
  tag: string;
  data: PlainTodo[];
}
interface StrictCompareTestData {
  today: Date;
  tag: string;
  problem: PlainTodo[];
  answer: PlainTodo[];
}

const generateTodoForSortTest = (): PlainTodo =>
  new Todo({
    owner: 'default owner',
    title: 'default title',
    importance: Math.ceil(Math.random() * 3),
    until: new Date(testToday.getTime() + Math.floor(Math.random() * WEEK)),
    from: new Date(1994, 10, 5),
    state: 'READY',
  }).toPlain();

const generateTodoListForSortTest = (length: number): PlainTodo[] =>
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

const generateRandomTodo = (id: string | undefined): PlainTodo => {
  const from = getRandomDate(START, END);
  const until = getDistantDate(from);
  return new Todo({
    owner: 'default owner',
    title: 'default title',
    importance: 1,
    id,
    from,
    until,
    state: getRandomState(),
  }).toPlain();
};

const getRandomIndex = (length: number, index: number, numNext: number): number =>
  Math.ceil(Math.random() * (length - index - numNext));

const getTodoIdFromNextElement = (
  length: number,
  index: number,
  numNext: number,
  arr: PlainTodo[],
): { idx: number[]; next: string[] } => {
  if (index + numNext >= length) return { next: [], idx: [] };

  const idx = Array.from({ length: numNext }, () => getRandomIndex(length, index, numNext))
    .sort((a, b) => a - b)
    .map((el, i) => el + i + index);

  const next = idx.map((el) => arr[el].id);
  return { idx, next };
};

const generateRandomNumber = (p: number, max: number): number => {
  let num = 0;
  const addNextNum = (): void => {
    if (num < max && Math.random() > p) {
      num += 1;
      addNextNum();
    }
  };
  addNextNum();
  return num;
};

const generateTodoListForUpdateTest = (length: number): PlainTodo[] => {
  const todos: PlainTodo[] = Array.from({ length }, (el, i) => generateRandomTodo(i.toString()));
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

const generateSortTestProblem = (answer: PlainTodo[]): PlainTodo[] => {
  const problem = JSON.parse(JSON.stringify(answer)).map((el: any) => new Todo(el).toPlain());
  problem.sort(() => Math.random() - 0.5);
  return problem;
};

const changeTodoStateRandomly = (todo: PlainTodo, p: number): PlainTodo => {
  if (todo.state === 'DONE' || Math.random() < p) return todo;
  if (todo.state === 'READY') return new Todo({ ...todo, state: 'WAIT' }).toPlain();
  return new Todo({ ...todo, state: 'READY' }).toPlain();
};

const generateUpdateTestProblem = (answer: PlainTodo[]): PlainTodo[] => {
  const problem = JSON.parse(JSON.stringify(answer))
    .map((el: any) => new Todo(el).toPlain())
    .map((el: PlainTodo) => changeTodoStateRandomly(el, 0.8));
  return problem;
};

const generateTestCases = (
  answerObject: TestData,
  generator: (answer: PlainTodo[]) => PlainTodo[],
  num: number,
): StrictCompareTestData[] =>
  new Array(num).fill(0).map((el, i) => ({
    today: answerObject.today,
    tag: `answer: ${answerObject.tag}, problem:${i}`,
    problem: generator(answerObject.data),
    answer: answerObject.data,
  }));

const generateTestSet = (
  data: TestData[],
  generator: (answer: PlainTodo[]) => PlainTodo[],
  multiplier: number,
): StrictCompareTestData[] => data.flatMap((el) => generateTestCases(el, generator, multiplier));

const generateSortTestSet = (data: TestData[], multiplier: number): StrictCompareTestData[] =>
  generateTestSet(data, generateSortTestProblem, multiplier);

const generateUpdateTestSet = (data: TestData[], multiplier: number): StrictCompareTestData[] =>
  generateTestSet(data, generateUpdateTestProblem, multiplier);

export {
  testToday,
  generateTodoListForSortTest,
  generateTodoListForUpdateTest,
  generateSortTestSet,
  generateUpdateTestSet,
};
