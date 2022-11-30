import { Todo } from '@todo/todo';
import { PlainTodo } from '@todo/todo.type';
import { createTodoList } from '@todo/todoList';
import { toComparableTodo, validateRTL, validateWTL } from './validator';
import { testToday, generateTodoListForUpdateTest, generateUpdateTestSet } from './generator';
import * as updateRawTestCase from './update.data.json';

const updateTestCase = updateRawTestCase.map((el) => ({
  tag: el.tag,
  today: new Date(el.today),
  data: el.data.map((todo) => new Todo({ ...todo, state: todo.state as 'DONE' | 'READY' | 'WAIT' }).toPlain()),
}));

const update = async (todoList: PlainTodo[], today: Date): Promise<PlainTodo[]> => {
  const newTodoList = await (await createTodoList('MemoryDB', todoList)).updateAll(today);
  return newTodoList.getTL();
};

const testCases = new Array(10).fill(0).map((el, i) => ({
  tag: `update/${i}`,
  today: testToday,
  data: generateTodoListForUpdateTest(Math.floor(Math.random() * 90) + 10),
}));

describe('업데이트 테스트', () => {
  describe.each(testCases)('$tag', ({ data, today }) => {
    it('RTL 조건 확인', async () => {
      const todoList = await update(data, today);
      expect(validateRTL(todoList, today)).toBe(true);
    });
    it('WTL 조건 확인', async () => {
      const todoList = await update(data, today);
      expect(validateWTL(todoList, today)).toBe(true);
    });
  });
});

const macroUnitTestCases = generateUpdateTestSet(updateTestCase, 5);

describe('업데이트 대단위 테스트', () => {
  describe.each(macroUnitTestCases)('$tag', ({ problem, today, answer }) => {
    it('Todo List의 선후관계 및 날짜 비교를 통해 Todo들의 상태를 업데이트 할 수 있다.', async () => {
      const todoList = await update(problem, today);
      expect(todoList.map((el) => toComparableTodo(el))).toEqual(answer.map((el: any) => toComparableTodo(el)));
    });
  });
});
