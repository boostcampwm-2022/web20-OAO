import { TestTodo, toTestTodo, toComparableTestTodo } from './type';
import { validateImminenceSort, validateImportanceSort, validateDeadlineSort } from './validator';
import { testToday, generateTodoListForSortTest, generateSortTestSet } from './generator';
import * as sortRawTestCase from './sort.data.json';

const sortTestCase = sortRawTestCase.map((el) => ({
  tag: el.tag,
  today: new Date(el.today),
  data: el.data.map((todo) => toTestTodo(todo)),
}));

const sort = (todoList: Array<TestTodo>, today: Date): Array<TestTodo> => {
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
      expect(validateImminenceSort(sort(data, today), today)).toBe(true);
    });
    it('Imminence 정렬이 Importance 정렬보다 우선한다.', () => {
      expect(validateImportanceSort(sort(data, today), today)).toBe(true);
    });
    it('Imminence 정렬이 Importance 정렬보다 우선하며, Importance 정렬이 EDF 정렬보다 우선한다.', () => {
      expect(validateDeadlineSort(sort(data, today), today)).toBe(true);
    });
  });
});

const macroUnitTestCases = generateSortTestSet(sortTestCase, 5);
// console.log(macroUnitTestCases);

describe('정렬 대단위 테스트', () => {
  describe.each(macroUnitTestCases)('$tag', ({ problem, today, answer }) => {
    it('Ready Todo List의 기본적인 정렬을 할 수 있다.', () => {
      expect(sort(problem, today).map((el) => toComparableTestTodo(el))).toEqual(
        answer.map((el) => toComparableTestTodo(el)),
      );
    });
  });
});
