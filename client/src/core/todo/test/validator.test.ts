import * as rawTestCase from './data.json';
import { TestTodo, toTestTodo } from './type';
import {
  validateImminenceSort,
  validateImportanceSort,
  validateDeadlineSort,
  validateLastPostponedSort,
  validateRTL,
  validateWTL,
} from './validator';

import * as testCase1 from './temp2.json';
import * as testCase2 from './temp7.json';
import * as testCase3 from './temp9.json';
import * as testCase4 from './temp-difficult0.json';
import * as testCase5 from './temp-difficult1.json';
import * as testCase6 from './temp-difficult4.json';

const sort = (todoList: Array<TestTodo>): Array<TestTodo> => {
  return [...todoList];
};

const update = (todoList: Array<TestTodo>): Array<TestTodo> => {
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

describe('업데이트 검증 알고리즘 테스트', () => {
  describe('RTL + WTL', () => {
    it('RTL + WTL', () => {
      const today = new Date('2023-1-1');
      const todoList1 = testCase1.data.map((el) => toTestTodo(el));
      const todoList2 = testCase2.data.map((el) => toTestTodo(el));
      const todoList3 = testCase3.data.map((el) => toTestTodo(el));
      const todoList4 = testCase4.data.map((el) => toTestTodo(el));
      const todoList5 = testCase5.data.map((el) => toTestTodo(el));
      const todoList6 = testCase6.data.map((el) => toTestTodo(el));
      expect(validateRTL(update(todoList1), today)).toBe(true);
      expect(validateRTL(update(todoList2), today)).toBe(true);
      expect(validateRTL(update(todoList3), today)).toBe(true);
      expect(validateRTL(update(todoList4), today)).toBe(true);
      expect(validateRTL(update(todoList5), today)).toBe(true);
      expect(validateRTL(update(todoList6), today)).toBe(true);
      expect(validateWTL(update(todoList1), today)).toBe(true);
      expect(validateWTL(update(todoList2), today)).toBe(true);
      expect(validateWTL(update(todoList3), today)).toBe(true);
      expect(validateWTL(update(todoList4), today)).toBe(true);
      expect(validateWTL(update(todoList5), today)).toBe(true);
      expect(validateWTL(update(todoList6), today)).toBe(true);
    });
  });
});
