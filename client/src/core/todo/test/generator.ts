import * as sortRawTestCase from './sort.data.json';
import * as updateRawTestCase from './update.data.json';
import { TestTodo, toTestTodo } from './type';

const sortTestCase: Array<TestData> = sortRawTestCase.map((el) => ({
  tag: el.tag,
  today: new Date(el.today),
  data: el.data.map((todo) => toTestTodo(todo)),
}));
const updateTestCase: Array<TestData> = updateRawTestCase.map((el) => ({
  tag: el.tag,
  today: new Date(el.today),
  data: el.data.map((todo) => toTestTodo(todo)),
}));

type TestData = { today: Date; tag: string; data: Array<TestTodo> };

const generateSortTestProblem = (answer: Array<TestTodo>) => {
  const problem = JSON.parse(JSON.stringify(answer)).map((el: any) => toTestTodo(el));
  problem.sort(() => Math.random() - 0.5);
  return problem;
};

const changeTodoStateRandomly = (todo: TestTodo, p: number) => {
  if (todo.state === 'DONE' || Math.random() < p) return todo;
  if (todo.state === 'READY') return { ...todo, state: 'WAIT' };
  return { ...todo, state: 'READY' };
};

const generateUpdateTestProblem = (answer: Array<TestTodo>) => {
  const problem = JSON.parse(JSON.stringify(answer))
    .map((el: any) => toTestTodo(el))
    .map((el: TestTodo) => changeTodoStateRandomly(el, 0.8));
  return problem;
};

const generateTestCases = (
  answerObject: TestData,
  generator: (answer: Array<TestTodo>) => Array<TestTodo>,
  num: number,
) =>
  new Array(num).fill(0).map((el, i) => ({
    today: answerObject.today,
    tag: `answer: ${answerObject.tag}, problem:${i}`,
    problem: generator(answerObject.data),
    answer: answerObject.data,
  }));

const generateTestSet = (
  data: Array<TestData>,
  generator: (answer: Array<TestTodo>) => Array<TestTodo>,
  multiplier: number,
) => data.flatMap((el) => generateTestCases(el, generator, multiplier));

const generateSortTestSet = (data: Array<TestData>, multiplier: number) =>
  generateTestSet(data, generateSortTestProblem, multiplier);

const generateUpdateTestSet = (data: Array<TestData>, multiplier: number) =>
  generateTestSet(data, generateUpdateTestProblem, multiplier);

export { generateSortTestSet, generateUpdateTestSet };
