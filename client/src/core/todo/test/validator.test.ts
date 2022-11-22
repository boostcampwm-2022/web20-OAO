import * as rawTestCase from './data.json';
import { TestTodo, toTestTodo } from './type';
import {
  validateImminenceSort,
  validateImportanceSort,
  validateDeadlineSort,
  validateLastPostponedSort,
} from './validator';

const sort = (todoList: Array<TestTodo>): Array<TestTodo> => {
  return [...todoList];
};

const testCase = rawTestCase[0].data.map((el: any) => toTestTodo(el));
const testToday = new Date(rawTestCase[0].today);

describe('검증 알고리즘 테스트', () => {
  let todoList: Array<TestTodo>;
  beforeEach(() => {
    todoList = testCase;
  });
  describe('Imminence 정렬', () => {
    it('Imminent Todo는 언제나 Distant Todo보다 우선순위가 높다', () => {
      expect(validateImminenceSort(sort(todoList), testToday)).toBe(true);
    });
  });
  describe('Importance 정렬', () => {
    it('Imminence 정렬 조건 아래에서, Importance가 큰 Todo가 낮은 Todo보다 우선순위가 높다.', () => {
      expect(validateImportanceSort(sort(todoList), testToday)).toBe(true);
    });
  });
  describe('Deadline 정렬', () => {
    it('Imminence와 Importance 정렬 조건 아래에서, Deadline이 가까운 Todo가 먼 Todo보다 우선순위가 높다.', () => {
      expect(validateDeadlineSort(sort(todoList), testToday)).toBe(true);
    });
  });
  describe('Last Postponed 정렬 ', () => {
    it('Imminence, Importance, Deadline 정렬 조건 아래에서, Last Postponed가 가장 예전인 Todo가 현재에 가까운 Todo보다 우선순위가 높다.', () => {
      expect(validateLastPostponedSort(sort(todoList), testToday)).toBe(true);
    });
  });
});
