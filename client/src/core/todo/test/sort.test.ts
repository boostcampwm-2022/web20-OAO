import { Todo, TodoList, PlainTodo } from '../todoList';
import { toComparableTodo, validateImminenceSort, validateImportanceSort, validateDeadlineSort } from './validator';
import { testToday, generateTodoListForSortTest, generateSortTestSet } from './generator';
import * as sortRawTestCase from './sort.data.json';

const sortTestCase = sortRawTestCase.map((el) => ({
  tag: el.tag,
  today: new Date(el.today),
  data: el.data.map((todo) =>
    new Todo({ ...todo, owner: 'default owner', state: 'READY', importance: todo.importance as number }).toPlain(),
  ),
}));

const sort = async (todoList: PlainTodo[], today: Date): Promise<PlainTodo[]> => {
  const newTodoList = new TodoList(todoList);
  return await newTodoList.getSortedRTL(today);
};

const testCases = new Array(10).fill(0).map((el, i) => ({
  tag: `sort/${i}`,
  today: testToday,
  data: generateTodoListForSortTest(Math.floor(Math.random() * 90) + 10),
}));

describe('기본 정렬 테스트', () => {
  describe.each(testCases)('$tag', ({ data, today }) => {
    it('다른 조건이 모두 동일하다면, Imminent Todo가 Active된다.', async () => {
      const todoList = await sort(data, today);
      expect(validateImminenceSort(todoList, today)).toBe(true);
    });
    it('Imminence 정렬이 Importance 정렬보다 우선한다.', async () => {
      const todoList = await sort(data, today);
      expect(validateImportanceSort(todoList, today)).toBe(true);
    });
    it('Imminence 정렬이 Importance 정렬보다 우선하며, Importance 정렬이 EDF 정렬보다 우선한다.', async () => {
      const todoList = await sort(data, today);
      expect(validateDeadlineSort(todoList, today)).toBe(true);
    });
  });
});

const macroUnitTestCases = generateSortTestSet(sortTestCase, 5);
// console.log(macroUnitTestCases);

describe('정렬 대단위 테스트', () => {
  describe.each(macroUnitTestCases)('$tag', ({ problem, today, answer }) => {
    it('Ready Todo List의 기본적인 정렬을 할 수 있다.', async () => {
      const todoList = await sort(problem, today);

      expect(todoList.map((el) => toComparableTodo(el))).toEqual(answer.map((el) => toComparableTodo(el)));
    });
  });
});
