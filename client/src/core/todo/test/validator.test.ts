import { TestTodo } from './type';
import { validateImminenceSort, validateImportanceSort, validateDeadlineSort } from './validator';
import controlInput from './validator.data';

const sort = (todoList: Array<TestTodo>): Array<TestTodo> => {
  return [...todoList];
};

describe('검증 알고리즘 테스트', () => {
  let todoList: Array<TestTodo>;
  beforeEach(() => {
    todoList = controlInput;
  });
  describe('Imminence 정렬', () => {
    it('다른 조건이 모두 동일하다면, Imminent Todo가 Active된다.', () => {
      expect(validateImminenceSort(sort(todoList))).toBe(true);
    });
  });
  describe('Imminence + Importance 정렬', () => {
    it('Imminence 정렬이 Importance 정렬보다 우선한다.', () => {
      expect(validateImportanceSort(sort(todoList))).toBe(true);
    });
  });
  describe('Imminence + Importance + EDF', () => {
    it('Imminence 정렬이 Importance 정렬보다 우선하며, Importance 정렬이 EDF 정렬보다 우선한다.', () => {
      expect(validateDeadlineSort(sort(todoList))).toBe(true);
    });
  });
});
