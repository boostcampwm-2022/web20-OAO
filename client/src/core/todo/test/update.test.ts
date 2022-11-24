import { TestTodo, toTestTodo, toComparableTestTodo } from './type';
import { validateRTL, validateWTL } from './validator';
import { testToday, generateTodoListForUpdateTest, generateUpdateTestSet } from './generator';
import * as updateRawTestCase from './sort.data.json';

const updateTestCase = updateRawTestCase.map((el) => ({
  tag: el.tag,
  today: new Date(el.today),
  data: el.data.map((todo) => toTestTodo(todo)),
}));

const update = (todoList: TestTodo[], today: Date): TestTodo[] => {
  return [...todoList];
};

const testCases = new Array(10).fill(0).map((el, i) => ({
  tag: `update/${i}`,
  today: testToday,
  data: generateTodoListForUpdateTest(Math.floor(Math.random() * 90) + 10),
}));

describe('업데이트 테스트', () => {
  describe.each(testCases)('$tag', ({ data, today }) => {
    it('RTL 조건 확인', () => {
      expect(validateRTL(update(data, today), today)).toBe(true);
    });
    it('WTL 조건 확인', () => {
      expect(validateWTL(update(data, today), today)).toBe(true);
    });
  });
});

const macroUnitTestCases = generateUpdateTestSet(updateTestCase, 5);

describe('업데이트 대단위 테스트', () => {
  describe.each(macroUnitTestCases)('$tag', ({ problem, today, answer }) => {
    it('Todo List의 선후관계 및 날짜 비교를 통해 Todo들의 상태를 업데이트 할 수 있다.', () => {
      expect(update(problem, today).map((el) => toComparableTestTodo(el))).toEqual(
        answer.map((el: any) => toComparableTestTodo(el)),
      );
    });
  });
});
