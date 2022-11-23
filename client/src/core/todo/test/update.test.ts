import { TestTodo, generateTodoListForUpdateTest, testToday } from './type';
import { validateRTL, validateWTL } from './validator';

const update = (todoList: Array<TestTodo>): Array<TestTodo> => {
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
      expect(validateRTL(update(data), today)).toBe(true);
    });
    it('WTL 조건 확인', () => {
      expect(validateWTL(update(data), today)).toBe(true);
    });
  });
});
