import { TestTodo, generateTodoListForSortTest, testToday } from './type';
import { validateImminenceSort, validateImportanceSort, validateDeadlineSort } from './validator';

const sort = (todoList: Array<TestTodo>): Array<TestTodo> => {
  return [...todoList];
};

const testCases = new Array(10).fill(0).map((el, i) => ({
  tag: `sort/${i}`,
  today: testToday,
  data: generateTodoListForSortTest(Math.floor(Math.random() * 90) + 10),
}));

describe('기본 정렬 테스트', () => {
  describe.each(testCases)('$tag', ({ data, today }) => {
    it('다른 조건이 모두 동일하다면, Imminent Todo가 Active된다.', () => {
      expect(validateImminenceSort(sort(data), today)).toBe(true);
    });
    it('Imminence 정렬이 Importance 정렬보다 우선한다.', () => {
      expect(validateImportanceSort(sort(data), today)).toBe(true);
    });
    it('Imminence 정렬이 Importance 정렬보다 우선하며, Importance 정렬이 EDF 정렬보다 우선한다.', () => {
      expect(validateDeadlineSort(sort(data), today)).toBe(true);
    });
  });
});
