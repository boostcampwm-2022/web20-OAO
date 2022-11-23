import * as sortRawTestCase from './sort.data.json';
import * as updateRawTestCase from './update.data.json';
import { toTestTodo } from './type';
import {
  validateImminenceSort,
  validateImportanceSort,
  validateDeadlineSort,
  validateLastPostponedSort,
  validateRTL,
  validateWTL,
} from './validator';

const sortTestCase = sortRawTestCase.map((el) => ({
  tag: el.tag,
  today: new Date(el.today),
  data: el.data.map((todo) => toTestTodo(todo)),
}));
const updateTestCase = updateRawTestCase.map((el) => ({
  tag: el.tag,
  today: new Date(el.today),
  data: el.data.map((todo) => toTestTodo(todo)),
}));

describe('검증 알고리즘 테스트', () => {
  describe('Imminence 정렬', () => {
    test.each(sortTestCase)('$tag', ({ today, data }) => {
      expect(validateImminenceSort(data, today)).toBe(true);
    });
  });
  describe('Importance 정렬', () => {
    test.each(sortTestCase)('$tag', ({ today, data }) => {
      expect(validateImportanceSort(data, today)).toBe(true);
    });
  });
  describe('Deadline 정렬', () => {
    test.each(sortTestCase)('$tag', ({ today, data }) => {
      expect(validateDeadlineSort(data, today)).toBe(true);
    });
  });
  describe('Last Postponed 정렬 ', () => {
    test.each(sortTestCase)('$tag', ({ today, data }) => {
      expect(validateLastPostponedSort(data, today)).toBe(true);
    });
  });
});

describe('업데이트 검증 알고리즘 테스트', () => {
  describe('RTL 조건 확인', () => {
    test.each(updateTestCase)('$tag', ({ today, data }) => {
      expect(validateRTL(data, today)).toBe(true);
    });
  });
  describe('WTL 조건 확인', () => {
    test.each(updateTestCase)('$tag', ({ today, data }) => {
      expect(validateWTL(data, today)).toBe(true);
    });
  });
});
